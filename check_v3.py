from PIL import Image
img = Image.open("src/assets/lovely_final_v3.png").convert("RGBA")
pixels = img.load()
# check corners
corners = [(0,0), (img.width-1, 0), (0, img.height-1), (img.width-1, img.height-1)]
for c in corners:
    print(f"Corner {c}: {pixels[c[0], c[1]]}")
