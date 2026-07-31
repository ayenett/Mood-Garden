from PIL import Image, ImageCms
import os

srgb_profile = ImageCms.createProfile("sRGB")
srgb_bytes = ImageCms.ImageCmsProfile(srgb_profile).tobytes()

img_original = Image.open("src/assets/Designer (50).png").convert("RGBA")

# Crop 600x600 around lovely (center 1019, 418)
cx, cy = 1019, 418
half = 250 # 500x500 to avoid ghost fruit! calm right edge is 837. 1019 - 250 = 769. 769 > 837? No, wait. 
# Calm right edge is 627 + 210 = 837.
# If lovely center is 1019. 1019 - 837 = 182.
# So if half = 180, it will not hit calm!
# Let's use half = 180 (360x360).
half = 190

box = (cx - half, cy - half, cx + half, cy + half)
crop = img_original.crop(box)

# Now we have the fruit on a solid cream background.
# The cream background is around (254, 248, 238).
# Let's write a simple flood fill from (0,0) with tolerance.
def flood_fill_transparent(image, seed_point, tolerance=10):
    pixels = image.load()
    width, height = image.size
    target_color = pixels[seed_point]
    
    # Check if a color is within tolerance
    def is_similar(c1, c2):
        return (abs(c1[0]-c2[0]) <= tolerance and
                abs(c1[1]-c2[1]) <= tolerance and
                abs(c1[2]-c2[2]) <= tolerance)
                
    stack = [seed_point]
    visited = set()
    
    while stack:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        if is_similar(pixels[x, y], target_color):
            pixels[x, y] = (0, 0, 0, 0) # Make transparent
            
            if x > 0: stack.append((x-1, y))
            if x < width-1: stack.append((x+1, y))
            if y > 0: stack.append((x, y-1))
            if y < height-1: stack.append((x, y+1))
            
    return image

out_img = flood_fill_transparent(crop, (0,0), tolerance=15)

out_path = "src/assets/lovely_manual.png"
out_img.save(out_path, "PNG", icc_profile=srgb_bytes)
print("Saved lovely_manual.png")
