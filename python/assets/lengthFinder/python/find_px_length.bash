#!/bin/bash

x=$(python3 /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/apriltag.py $1)
# x=$(python3 apriltag.py $1)


# echo $x

y=$(python3 /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/corners_dimensions.py /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/april_tag.jpg)
# y=$(python3 corners_dimensions.py $1)

len=$(cut -d' ' -f1 <<<"$y")
wid=$(cut -d' ' -f2 <<<"$y")

 python3 /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/converter.py $x $len $wid
