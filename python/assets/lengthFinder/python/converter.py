#!/usr/bin/env python

import sys
import json

# print(sys.argv)

length= float(sys.argv[1]) * float(sys.argv[2])
# print(length)
width= float(sys.argv[1]) * float(sys.argv[3])
# print(width)
SurfArea= length*width
# print(SurfArea)

data = {}
data['Size'] = []

data['Size'].append({
	'length': length,
	'width' : width,
	'SurfaceArea' : SurfArea
	})

print(json.dumps(data,indent=2))