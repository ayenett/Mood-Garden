import sys
import os
from PIL import Image, ImageCms

img = Image.open("src/assets/Designer (50).png").convert("RGBA")

# Extract the crop that contains lovely but NOT the ghost fruit.
# The ghost fruit was on the left of lovely.
# Let's crop from x=870 to 1180, y=250 to 580.
# Lovely center is 1019, 418.
box = (870, 250, 1180, 580)
crop = img.crop(box)

def flood_fill_transparency(image, seed_point, tolerance):
    data = image.load()
    width, height = image.size
    seed_color = data[seed_point]
    
    target_color = (0, 0, 0, 0)
    stack = [seed_point]
    visited = set()
    
    while stack:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        current_color = data[x, y]
        
        r_diff = abs(current_color[0] - seed_color[0])
        g_diff = abs(current_color[1] - seed_color[1])
        b_diff = abs(current_color[2] - seed_color[2])
        
        if r_diff <= tolerance and g_diff <= tolerance and b_diff <= tolerance:
            data[x, y] = target_color
            if x > 0: stack.append((x - 1, y))
            if x < width - 1: stack.append((x + 1, y))
            if y > 0: stack.append((x, y - 1))
            if y < height - 1: stack.append((x, y + 1))

flood_fill_transparency(crop, (0, 0), 20)

icc = img.info.get('icc_profile')
if icc:
    crop.save("src/assets/lovely_final_v4.png", "PNG", icc_profile=icc)
else:
    crop.save("src/assets/lovely_final_v4.png", "PNG")
print("Done")
