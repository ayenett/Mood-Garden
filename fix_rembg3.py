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
    ("Happy_final.png", (234, 418)),
    ("calm_final.png", (627, 418)),
    ("lovely_final.png", (1019, 418)),
    ("sad_final.png", (359, 836)),
    ("stress_final.png", (894, 836))
]

for name, center in fruits:
    cx, cy = center
    half = 300 # Increased from 210 to 300 to capture entire fruit (600x600 crop)
    
    # Ensure crop box doesn't go out of bounds
    left = max(0, int(cx - half))
    upper = max(0, int(cy - half))
    right = min(img_original.width, int(cx + half))
    lower = min(img_original.height, int(cy + half))
    
    box = (left, upper, right, lower)
    crop = img_original.crop(box)
    
    # Run rembg to perfectly remove background without circular cut
    output_data = remove(crop)
    
    # output_data is a PIL Image
    out_path = os.path.join("src/assets", name)
    output_data.save(out_path, "PNG", icc_profile=srgb_bytes)
    print(f"Saved {name} with sRGB profile")

print("Done!")
