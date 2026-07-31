import sys
from rembg import remove
from PIL import Image, ImageCms
import os

srgb_profile = ImageCms.createProfile("sRGB")
srgb_bytes = ImageCms.ImageCmsProfile(srgb_profile).tobytes()

img = Image.open("src/assets/Designer (50).png").convert("RGBA")

# Use a tight bounding box that encapsulates Lovely but EXCLUDES Calm.
# Calm center is 627. Lovely center is 1019.
# Let's crop from X=800 to X=1200. Y=250 to Y=650.
box = (800, 250, 1200, 650)
crop = img.crop(box)

out = remove(crop)
out.save("src/assets/lovely_fixed.png", "PNG", icc_profile=srgb_bytes)
print("Saved lovely_fixed.png")
