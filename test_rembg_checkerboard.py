import sys
import os
from rembg import remove
from PIL import Image, ImageCms

srgb_profile = ImageCms.createProfile("sRGB")
srgb_bytes = ImageCms.ImageCmsProfile(srgb_profile).tobytes()

files = ["happy.png", "calm.png", "lovely.png", "sad.png", "stress.png"]
for f in files:
    in_path = os.path.join("src/assets", f)
    out_path = os.path.join("src/assets", "clean_" + f)
    if os.path.exists(in_path):
        img = Image.open(in_path).convert("RGBA")
        output = remove(img)
        output.save(out_path, "PNG", icc_profile=srgb_bytes)
        print(f"Processed {f}")

print("Done")
