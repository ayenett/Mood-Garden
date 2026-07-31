import sys
import os
from rembg import remove
from PIL import Image

def process_file(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
            output_data = remove(input_data)
            with open(output_path, 'wb') as o:
                o.write(output_data)
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

images = ["Happy.png", "calm.png", "lovely.png", "sad.png", "stress.png"]
for img in images:
    path = os.path.join("src/assets", img)
    if os.path.exists(path):
        process_file(path, path)
    else:
        print(f"Not found: {path}")

print("Done!")
