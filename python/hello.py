import json
import sys

person_list = [
    {"label": "Pineapple", "score": 99},
    {"label": "Chicken", "score": 10},
    {"label": "Beef", "score": 10},
]

print(json.dumps(person_list))
