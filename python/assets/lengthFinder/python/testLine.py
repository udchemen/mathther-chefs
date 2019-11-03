import numpy as np 
import cv2
import sys 
img = cv2.imread(sys.argv[9], cv2.IMREAD_COLOR)
print(sys.argv[9])
x1=int(float(sys.argv[1]))
y1=int(float(sys.argv[2]))

x2=int(float(sys.argv[3]))
y2=int(float(sys.argv[4]))

x3=int(float(sys.argv[5]))
y3=int(float(sys.argv[6]))

x4=int(float(sys.argv[7]))
y4=int(float(sys.argv[8]))

cv2.line(img,(x1,y1) , (x2,y2)   ,(255,255,255),15)
cv2.line(img,(x2,y2) , (x3,y3)   ,(255,255,255),15)
cv2.line(img,(x3,y3) , (x4,y4)   ,(255,255,255),15)
cv2.line(img,(x4,y4) , (x1,y1)   ,(255,255,255),15)
# cv2.imshow('image', img)
# cv2.waitKey(0)
cv2.imwrite('boxedImage.jpg', img)
# cv2.destroyAllWindows()

# int(sys.argv[1]),int(sys.argv[2])),(int(sys.argv[3]),int(sys.argv[4])