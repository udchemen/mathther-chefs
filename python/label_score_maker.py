import io
import json
import os
import sys

from google.cloud import vision
from google.cloud.vision import types

#Set Up Credentials
credential_path = "/Users/Lucas/Apps/Web/mathther-chefs/python/config/google_client_secrets.json"
# dirname = os.path.dirname(__file__)
# credential_path = os.path.join(dirname, '../config/google_client_secrets.json')
# credential_path = os.path.abspath(credential_path)

image_path = sys.argv[1]


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

#Set up Image and Labels

client = vision.ImageAnnotatorClient()
with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
image = vision.types.Image(content=content)

response_label = client.label_detection(image=image)
labels = response_label.label_annotations

#Parse only relevant foods

foods = ['meat', 'beef', 'steak', 'chicken', 'fish']

label_matches = []
score_matches = []

for label in labels:
	if any(word in label.description for word in foods):
		label_matches.append(label.description)
		score_matches.append(str(round(label.score*100, 2)) + "%")

# for case_num in range(0, len(label_matches)) : print(label_matches[case_num], score_matches[case_num])


#write to JSON file
data = []

for case_num in range(0, len(label_matches)):
	data.append({
        'label': label_matches[case_num],
        'score': score_matches[case_num]
    })


print(json.dumps(data, indent = 4))
