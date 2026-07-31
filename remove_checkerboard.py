import sys
import os
from rembg import remove
from PIL import Image

fruits = [
    "happy.png",
    "calm.png",
    "lovely.png",
    "sad.png",
    "stress.png"
]

for name in fruits:
    in_path = os.path.join("src/assets", name)
    out_path = os.path.join("src/assets", name.replace(".png", "_nobg.png"))
    
    print(f"Processing {name}...")
    try:
        with open(in_path, 'rb') as i:
            input_data = i.read()
        
        output_data = remove(input_data)
        
        with open(out_path, 'wb') as o:
            o.write(output_data)
        
        print(f"Saved {out_path}")
    except Exception as e:
        print(f"Error processing {name}: {e}")

print("Done!")
