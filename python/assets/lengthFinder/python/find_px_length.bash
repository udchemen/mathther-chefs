#!/bin/bash

# x=$(python3 /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/apriltag.py $1)
x=$(python3 apriltag.py $1)


# echo $x

# y=$(python3 /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/corners_dimensions.py $1)
y=$(python3 corners_dimensions.py $1)

# echo $y 
len=$(cut -d' ' -f1 <<<"$y")
# echo $len
wid=$(cut -d' ' -f2 <<<"$y")
# echo $wid
# pythonp "$x*0.0001431929594464307"
# echo "$((384553827811*0.0001431929594464307))"

 # python3 /Users/Lucas/Apps/Web/mathther-chefs/python/assets/lengthFinder/python/converter.py $x $len $wid
python3 converter.py $x $len $wid
# echo "$(($len*$x))"


bash boxGen.bash $1

# tr -d '[]' < coords.txt > coords2.txt

# cat coords2.txt

# coord1=$(sed -n '1p' <coords2.txt)
# coord1X=$(cut -d',' -f1 <<<"$coord1")
# coord1Y=$(cut -d',' -f2 <<<"$coord1")
# echo $coord1X
# echo $coord1Y

# coord2=$(sed -n '2p' <coords2.txt)
# coord2X=$(cut -d',' -f1 <<<"$coord2")
# coord2Y=$(cut -d',' -f2 <<<"$coord2")
# echo $coord2X
# echo $coord2Y

# coord3=$(sed -n '3p' <coords2.txt)
# coord3X=$(cut -d',' -f1 <<<"$coord3")
# coord3Y=$(cut -d',' -f2 <<<"$coord3")
# # echo $coord3X
# # echo $coord3Y

# coord4=$(sed -n '4p' <coords2.txt)
# coord4X=$(cut -d',' -f1 <<<"$coord4")
# coord4Y=$(cut -d',' -f2 <<<"$coord4")
# # echo $coord4X
# # echo $coord4Y

# python testLine.py  $1


# coord3=echo $(sed -n '3p' <coords.txt)
# coord4=echo $(sed -n '4p' <coords.txt)