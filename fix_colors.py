import sys
import os
from rembg import remove
from PIL import Image

files = ["happy.png", "calm.png", "lovely.png", "sad.png", "stress.png"]
for f in files:
    in_path = os.path.join("src/assets", f)
    out_path = os.path.join("src/assets", "clean_" + f)
    if os.path.exists(in_path):
        img = Image.open(in_path)
        icc = img.info.get('icc_profile')
        if icc:
            print(f"{f} has ICC profile.")
        else:
            print(f"{f} has NO ICC profile.")
        
        # Convert to RGBA for rembg
        img_rgba = img.convert("RGBA")
        output = remove(img_rgba)
        
        # Save with original ICC profile
        if icc:
            output.save(out_path, "PNG", icc_profile=icc)
        else:
            output.save(out_path, "PNG")
            
        print(f"Fixed {f}")

print("Done")
