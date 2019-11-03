#!/usr/bin/env python

import json
import sys

# print(sys.argv)

length= float(sys.argv[1]) * float(sys.argv[2])
# print(length)
width= float(sys.argv[1]) * float(sys.argv[3])
# print(width)
SurfArea= length*width
# print(SurfArea)

data = []

data.append({
	'length': length,
	'width' : width,
	'surfaceArea' : SurfArea
	})

print(json.dumps(data))
