import sys
import os
from rembg import remove
from PIL import Image, ImageCms
import io

# Create sRGB profile
srgb_profile = ImageCms.createProfile("sRGB")
srgb_bytes = ImageCms.ImageCmsProfile(srgb_profile).tobytes()

img_original = Image.open("src/assets/Designer (50).png").convert("RGBA")

fruits = [
    ("Happy_perfect.png", (234, 418)),
    ("calm_perfect.png", (627, 418)),
    ("lovely_perfect.png", (1019, 418)),
    ("sad_perfect.png", (359, 836)),
    ("stress_perfect.png", (894, 836))
]

for name, center in fruits:
    cx, cy = center
    half = 210
    box = (int(cx - half), int(cy - half), int(cx + half), int(cy + half))
    crop = img_original.crop(box)
    
    # Run rembg to perfectly remove background without circular cut
    output_data = remove(crop)
    
    # output_data is a PIL Image
    out_path = os.path.join("src/assets", name)
    output_data.save(out_path, "PNG", icc_profile=srgb_bytes)
    print(f"Saved {name} with sRGB profile")

print("Done!")
