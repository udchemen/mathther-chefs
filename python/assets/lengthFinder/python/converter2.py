#!/usr/bin/env python

import json
import sys

data = []

data.append({
	'length': 1,
	'width' : 1,
	'surfaceArea' : 10
	})

print(json.dumps(data))
