from PIL import Image
from collections import Counter

img = Image.open("src/assets/lovely.png").convert("RGBA")
pixels = list(img.getdata())

# Get the most common colors in the image (likely the checkerboard background)
counts = Counter(pixels)
print("Most common colors:")
for color, count in counts.most_common(10):
    print(f"{color}: {count}")
