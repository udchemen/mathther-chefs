#!/bin/bash

x=$(python3 apriltag.py $1)

# echo $x

y=$(python3 corners_dimensions.py)

# echo $y 
len=$(cut -d' ' -f1 <<<"$y")
# echo $len
wid=$(cut -d' ' -f2 <<<"$y")
# echo $wid
# pythonp "$x*0.0001431929594464307"
# echo "$((384553827811*0.0001431929594464307))"

 python3 converter.py $x $len $wid

# echo "$(($len*$x))"