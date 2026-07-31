from PIL import Image
img = Image.open("src/assets/lovely_fixed.png")
pixels = img.load()
ghost = False
for y in range(img.height):
    for x in range(50): # check first 50 pixels on the left
        if pixels[x, y][3] > 0:
            ghost = True
            break
if ghost:
    print("GHOST DETECTED")
else:
    print("NO GHOST")
