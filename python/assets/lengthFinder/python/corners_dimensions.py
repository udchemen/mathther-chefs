import os

from PIL import Image

credential_path = "/Users/Lucas/Apps/Web/mathther-chefs/python/config/google_client_secrets.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

def corner_finder(path):
    """Localize objects in the local image.

    Args:
    path: The path to the local file.
    """
    #Find Image Size
    im = Image.open('raw steak.jpg')

    x_width = im.size[0]
    y_height = im.size[1]

    from google.cloud import vision
    client = vision.ImageAnnotatorClient()

    with open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.types.Image(content=content)

    objects = client.object_localization(
        image=image).localized_object_annotations

    #print('Number of objects found: {}'.format(len(objects)))
    x_coords = []
    y_coords = []
    for object_ in objects:
       # print('Normalized bounding polygon vertices: ')
        for vertex in object_.bounding_poly.normalized_vertices:
     #       print(' - ({}, {})'.format(vertex.x, vertex.y))
            x_coords.append(vertex.x)
            y_coords.append(vertex.y)

    x_coords = [x_width * i for i in x_coords]
    y_coords = [y_height * i for i in y_coords]
    #print(x_coords)
    #print(y_coords)
    d1 = ( (x_coords[1] - x_coords[0])** 2 + (y_coords[1] - y_coords[0])**2)**(0.5)
    d2 = ( (x_coords[2] - x_coords[1])** 2 + (y_coords[2] - y_coords[1])**2)**(0.5)
    print(d1,d2)
    # SA = d1 * d2
    # print(SA)
    # return SA


corner_finder('raw steak.jpg')
