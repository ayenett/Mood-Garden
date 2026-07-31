from PIL import Image
img = Image.open("src/assets/lovely_final_v3.png").convert("RGBA")
pixels = img.load()
for x in range(0, img.width, 50):
    print(f"X={x}, Y=200: {pixels[x, 200]}")
