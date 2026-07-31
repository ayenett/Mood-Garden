from PIL import Image, ImageCms
import os
from rembg import remove

img = Image.open('src/assets/Designer (50).png').convert("RGBA")
icc = img.info.get('icc_profile')

fruits = [
    ("Happy_final_v5.png", 234, 418, 190),
    ("calm_final_v5.png", 627, 418, 190),
    ("sad_final_v5.png", 359, 836, 230),
    ("stress_final_v5.png", 894, 836, 230)
]

for name, cx, cy, half in fruits:
    box = (cx - half, cy - half, cx + half, cy + half)
    crop = img.crop(box)
    
    out = remove(crop)
    out_path = os.path.join('src/assets', name)
    out.save(out_path, "PNG", icc_profile=icc)
    print(f"Saved {name}")

print("Done")
