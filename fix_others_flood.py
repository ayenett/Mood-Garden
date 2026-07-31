import sys
import os
from PIL import Image, ImageCms

img = Image.open("src/assets/Designer (50).png").convert("RGBA")

fruits = [
    ("sad_final_v4.png", (180, 670, 520, 1000)),
    ("stress_final_v4.png", (720, 670, 1070, 1000))
]

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

icc = img.info.get('icc_profile')

for name, box in fruits:
    crop = img.crop(box)
    flood_fill_transparency(crop, (0, 0), 20)
    
    if icc:
        crop.save(os.path.join("src/assets", name), "PNG", icc_profile=icc)
    else:
        crop.save(os.path.join("src/assets", name), "PNG")
    print(f"Saved {name}")

print("Done")
