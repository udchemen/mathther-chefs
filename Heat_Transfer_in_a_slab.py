#!/usr/bin/env python
# coding: utf-8

# In[257]:


######################################################################################
#########                                                              ###############
######### Estimation of cooking times for a rectangular slab type meat ###############
#########                                                              ###############
######################################################################################

#### Importing libraries

import os
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import fsolve


########## 1. Thermal properties for the base case (Lean Beef) at near room termperatures ##############

h=28 #Heat transfer coefficient. Includes the effect of radiation (W/mK)
L=0.02 #Thickness of the meat cut (m)


k=0.38 #Thermal conductivity of the meat 
rho=1019 # Density of the meat
cp=3430 #Specific heat at constant pressure (J/kgK)

Ti=2+273.15 #Initial temperature of the meat
Ta=160+273.15 #Temperature of the oven
Tr=60+273.15 # desired temperature (user input)

########## 2. Derived dimensionless numbers ##########
Bi=h*L/k #Biot number
alpha=k/(rho*cp) #Thermal diffusivity
tc=L**2/alpha #characteristic time
theta_r=(Tr-Ta)/(Ti-Ta)

######### 3. Cooking time calcultion ############

#### 3.1 Finding eigen values ####
### For slab the transcendental equation is given by Bi=lambda*tan(lambda)##

number_of_eigen_values=40

def func_tan(x):
    return x*np.tan(x)-Bi 

guess=np.arange(0.1,10,(10-0.1)/number_of_eigen_values)

res = fsolve(func_tan,guess)
res=np.around(res,6)
eigen_values=np.unique(np.absolute(res))  #eigen values


Fo=np.arange(0,2,0.02)   # Fourier number

x_star=np.arange(0,1,0.01) # dimensionless space grid
T_star=[] #dimensionless temperature
s=0           
x_center=0 #dimensionless centre
theta=[]

#### Theta=A_n*space_func*exp_func

A_n=[2*np.sin(i)/(i+np.sin(i)*np.cos(i)) for i in eigen_values]
space_func=[np.cos(i*x_center) for i in eigen_values]

for k in range(len(Fo)):
    for j in range(len(space_func)):
        s+=A_n[j]*space_func[j]*np.exp(-(eigen_values[j]**2)*Fo[k])
    theta.append(s)
    s=0

Temp=[i*(Ti-Ta)+Ta for i in theta]  #### Temperature profile at the center


for index, val in enumerate(theta):
    if np.absolute(val-theta_r) < 0.01:
        cooking_time=Fo[index]*tc    ###cooking time in seconds

######### Temperature vs eta


# print(np.dot(A_n,space_func))
print(cooking_time/3600,theta_r)
# print(theta)
print(eigen_values,Bi)


# In[233]:


banana = ("banana", "a yellow fruit")
orange = ("orange", "a orange fruit")
apple = ("apple", "a green fruit") 
my_list = [banana, orange, apple]

def lookup():
    word = input("Word to lookup: ")
    print ("\n")
    for fruit in my_list:
        if fruit[0] == word:
            print (fruit[0], ":", fruit[1], "\n")
            return
    print("That word does not exist in the dictionary")
lookup()


# In[222]:


f=2*np.sin(9.561532)/(9.561532+np.sin(9.561532)*np.cos(9.561532))
g=np.exp(-((0.946972)**2)*1.5)
h=np.cos(3.501085*0.5)
m=2*np.sin(6.483413)/(6.483413+np.sin(6.483413)*np.cos(6.483413))
n=np.exp(-((6.483413)**2)*0.6)
o=np.cos(6.483413*0.5)

print(g)

