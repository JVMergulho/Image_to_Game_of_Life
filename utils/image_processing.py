import sys
import os
from rembg import remove 
from PIL import Image 

NEWSIZE = (80, 80)

if len(sys.argv)< 2:
    sys.exit("Number of arguments does not match the required: you must inform <path/to/input/image>")

img_path =  sys.argv[1]
#python utils/image_processing.py path_to_image

img = Image.open(img_path) 

# calculate the dimensions to crop
width, height = img.size
min_dim = min(width, height)
left = (width - min_dim) / 2
top = (height - min_dim) / 2
right = (width + min_dim) / 2
bottom = (height + min_dim) / 2

# crop the image
img_cropped = img.crop((left, top, right, bottom))

# returns a png
img_no_bg = remove(img_cropped) 

img_name, img_ext = os.path.splitext(os.path.basename(img_path))

# resize the image
output = img_no_bg.resize(NEWSIZE)

#save image used
output.save('examples/'+img_name+'_no_bg.png') 

#save image for grid
output.save('examples/input_img_no_bg.png') 
