import sys
import os
from rembg import remove
from PIL import Image

in_path = "src/assets/lovely.png"
if os.path.exists(in_path):
    img = Image.open(in_path)
    icc = img.info.get('icc_profile')
    
    # Convert to RGBA
    img_rgba = img.convert("RGBA")
    
    # We will use rembg
    output = remove(img_rgba)
    
    # Save with original ICC profile
    out_path = "src/assets/final_lovely.png"
    if icc:
        output.save(out_path, "PNG", icc_profile=icc)
    else:
        output.save(out_path, "PNG")
        
    print(f"Fixed {in_path} using rembg")

print("Done")
