import sys
import os
import math
from PIL import Image, ImageDraw

def create_perfect_crop(img, center, crop_size, name):
    cx, cy = center
    half = crop_size / 2.0
    
    # We use fractional coordinates for smooth resizing if needed, but int for crop
    box = (int(cx - half), int(cy - half), int(cx + half), int(cy + half))
    crop = img.crop(box)
    
    # Resize to exactly 420x420 so they all have the same output size
    TARGET_SIZE = 420
    crop = crop.resize((TARGET_SIZE, TARGET_SIZE), Image.Resampling.LANCZOS)
    
    # Create radial alpha mask based on target size
    mask = Image.new('L', (TARGET_SIZE, TARGET_SIZE), 0)
    
    # 38% radius = 160px, 49% radius = 205px
    R1 = int(TARGET_SIZE * 0.38)
    R2 = int(TARGET_SIZE * 0.49)
    
    pixels = mask.load()
    center_x, center_y = TARGET_SIZE/2, TARGET_SIZE/2
    for y in range(TARGET_SIZE):
        for x in range(TARGET_SIZE):
            dist = math.sqrt((x - center_x)**2 + (y - center_y)**2)
            if dist <= R1:
                pixels[x,y] = 255
            elif dist >= R2:
                pixels[x,y] = 0
            else:
                pixels[x,y] = int(255 * (1 - (dist - R1) / (R2 - R1)))
                
    # Apply mask
    crop.putalpha(mask)
    
    out_path = os.path.join("src/assets", name)
    crop.save(out_path, "PNG")
    print(f"Created {out_path} (Crop Size: {crop_size})")

img = Image.open("src/assets/Designer (50).png").convert("RGBA")

fruits = [
    ("Happy.png", (240, 440), 460),
    ("calm.png", (627, 418), 420),
    ("lovely.png", (1019, 395), 390),
    ("sad.png", (385, 855), 440),
    ("stress.png", (894, 850), 400)
]

for name, center, crop_size in fruits:
    create_perfect_crop(img, center, crop_size, name)

print("Done adjusting sizes and alignments!")
