import sys
import os
from PIL import Image, ImageDraw

def create_masked_crop(img, center, size, name):
    cx, cy = center
    half = size // 2
    box = (int(cx - half), int(cy - half), int(cx + half), int(cy + half))
    crop = img.crop(box)
    
    # Create radial alpha mask
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    
    # Fully opaque up to radius R1, fade to 0 at R2
    R1 = int(size * 0.35) # 35% radius = 147px
    R2 = int(size * 0.48) # 48% radius = 201px
    
    # Draw concentric circles to create a soft gradient
    for r in range(size):
        if r <= R1:
            alpha = 255
        elif r >= R2:
            alpha = 0
        else:
            # linear interpolation
            alpha = int(255 * (1 - (r - R1) / (R2 - R1)))
            
        # Draw a circle with this alpha
        # Note: ImageDraw doesn't have a thick circle with smooth edges easily,
        # it's better to process pixels or draw from outside in
        pass
        
    # Better pixel approach for perfect radial gradient
    import math
    pixels = mask.load()
    center_x, center_y = size/2, size/2
    for y in range(size):
        for x in range(size):
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
    print(f"Created {out_path}")

img = Image.open("src/assets/Designer (50).png").convert("RGBA")

fruits = [
    ("Happy.png", (234, 418)),
    ("calm.png", (627, 418)),
    ("lovely.png", (1019, 418)),
    ("sad.png", (359, 836)),
    ("stress.png", (894, 836))
]

for name, center in fruits:
    create_masked_crop(img, center, 420, name)

print("Done generating perfect assets!")
