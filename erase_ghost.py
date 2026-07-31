from PIL import Image

img = Image.open("src/assets/lovely_fixed.png")
pixels = img.load()
for y in range(img.height):
    for x in range(120): # Erase first 120 pixels to be safe
        pixels[x, y] = (0, 0, 0, 0)

img.save("src/assets/lovely_final_no_ghost.png", "PNG", icc_profile=img.info.get('icc_profile'))
print("Erased ghost!")
