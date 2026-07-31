from PIL import Image, ImageCms
import os
from rembg import remove

img = Image.open('src/assets/Designer (50).png').convert("RGBA")
icc = img.info.get('icc_profile')

# Shift center to the right to avoid ghost fruit on the left, but keep hearts on the right
cx, cy = 1045, 418
half = 230 # 460x460 box

box = (cx - half, cy - half, cx + half, cy + half)
crop = img.crop(box)

out = remove(crop)
out.save('src/assets/perfect_lovely_shifted.png', "PNG", icc_profile=icc)
print("Saved perfect_lovely_shifted.png")
