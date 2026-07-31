from PIL import Image, ImageCms
img = Image.open("src/assets/lovely.png").convert("RGBA")
data = img.getdata()
new_data = []

# Checkerboard in fake transparent pngs are usually exact #FFFFFF and a specific gray.
# Let's find the exact gray by looking at the top-left pixel.
bg_color1 = data[0]
bg_color2 = (255, 255, 255, 255)
# Find the second color by scanning the first row
for p in data:
    if p != bg_color1:
        bg_color2 = p
        break

print(f"Checkerboard colors detected: {bg_color1} and {bg_color2}")

for item in data:
    # If the pixel matches bg_color1 or bg_color2 (within a tiny tolerance), make transparent
    r1, g1, b1 = abs(item[0] - bg_color1[0]), abs(item[1] - bg_color1[1]), abs(item[2] - bg_color1[2])
    r2, g2, b2 = abs(item[0] - bg_color2[0]), abs(item[1] - bg_color2[1]), abs(item[2] - bg_color2[2])
    
    if (r1 < 10 and g1 < 10 and b1 < 10) or (r2 < 10 and g2 < 10 and b2 < 10):
        new_data.append((0, 0, 0, 0))
    else:
        new_data.append(item)

img.putdata(new_data)
icc = img.info.get('icc_profile')
if icc:
    img.save("src/assets/lovely_final_v3.png", "PNG", icc_profile=icc)
else:
    img.save("src/assets/lovely_final_v3.png", "PNG")
print("Done")
