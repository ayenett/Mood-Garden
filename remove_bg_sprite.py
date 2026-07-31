import sys
import os
from rembg import remove
from PIL import Image

input_path = "src/assets/Designer (50).png"
output_path = "src/assets/Designer_transparent.png"

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
