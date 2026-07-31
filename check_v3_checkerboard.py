from PIL import Image
from collections import Counter
img = Image.open("src/assets/lovely_final_v3.png").convert("RGBA")
pixels = list(img.getdata())
counts = Counter(pixels)
print("Most common colors:")
for color, count in counts.most_common(10):
    print(f"{color}: {count}")
