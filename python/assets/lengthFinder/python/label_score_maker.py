import os, io, json
from google.cloud import vision
from google.cloud.vision import types
from PIL import Image

#Set Up Credentials
credential_path = "D:\Adam PC\Documents\Coding Stuffs\Physics Hackathon Montreal 2019\client_secrets.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

#Find Image Size
im = Image.open('D:\Adam PC\Desktop\\raw steak.jpg')
print(im.size)

#Set up Image and Labels

client = vision.ImageAnnotatorClient()

path = 'D:\Adam PC\Desktop\\raw steak.jpg'
with io.open(path, 'rb') as image_file:
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

for case_num in range(0, len(label_matches)) : print(label_matches[case_num], score_matches[case_num])


#write to JSON file
data={}
data['options'] = []

for case_num in range(0, len(label_matches)):
	data['options'].append({
		'label': label_matches[case_num],
		'score': score_matches[case_num]
			})


print(json.dumps(data, indent = 4))
