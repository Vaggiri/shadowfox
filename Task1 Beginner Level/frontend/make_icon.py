from PIL import Image, ImageDraw, ImageOps
import os

def create_circular_favicon():
    try:
        # Paths
        input_path = os.path.join('public', 'giri.jpg')
        output_path = os.path.join('public', 'favicon.png')
        
        # Open image
        img = Image.open(input_path).convert("RGBA")
        
        # Create mask
        size = img.size
        mask = Image.new('L', size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + size, fill=255)
        
        # Apply mask
        output = ImageOps.fit(img, size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        # Resize to standard favicon size (optional, but keep high res for modern screens)
        # keeping original resolution for now, browser will scale
        
        # Save
        output.save(output_path)
        print(f"Successfully created {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_circular_favicon()
