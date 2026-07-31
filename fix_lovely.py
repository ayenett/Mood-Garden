import sys
import os
from PIL import Image, ImageCms, ImageDraw

img = Image.open("src/assets/Designer (50).png").convert("RGBA")

# Extract the crop that contains lovely but NOT the ghost fruit.
# The ghost fruit was on the left.
# Let's crop from x=830 to 1200, y=210 to 600
box = (820, 220, 1180, 580)
crop = img.crop(box)

# We want to make the background transparent.
# The background color is approximately (253, 241, 233, 255)
# We will do a flood fill from (0,0) with transparency.

def flood_fill_transparency(image, seed_point, tolerance):
    data = image.load()
    width, height = image.size
    seed_color = data[seed_point]
    
    # Target color is transparent
    target_color = (0, 0, 0, 0)
    
    # stack for flood fill
    stack = [seed_point]
    
    # visited set
    visited = set()
    
    while stack:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        current_color = data[x, y]
        
        # Check distance
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

# Save the final lovely image
icc = img.info.get('icc_profile')
crop.save("src/assets/final_lovely.png", "PNG", icc_profile=icc)
print("Saved final_lovely.png")

