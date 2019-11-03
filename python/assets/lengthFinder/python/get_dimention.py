import json
import sys

import corners_dimensions

path = sys.argv[1]

SA = corners_dimensions.corner_finder(path)

data = {'surfaceArea': SA}

print(json.dumps(data))
