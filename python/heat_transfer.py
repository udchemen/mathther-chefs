#!/usr/bin/env python
# coding: utf-8

# In[297]:


######################################################################################
#########                                                              ###############
######### Estimation of cooking times for a rectangular slab type meat ###############
#########                                                              ###############
######################################################################################

#### Importing libraries

import json
import os
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.optimize import fsolve

meat_type = sys.argv[1]
meat_type = meat_type.lower()
if 'beef' in meat_type: meat_type = 'beef'
elif 'steak' in meat_type: meat_type = 'beef'
elif 'chicken' in meat_type: meat_type = 'chicken'
elif 'turkey' in meat_type: meat_type = 'turkey'
elif 'lamb' in meat_type: meat_type = 'lamb'
elif 'pork' in meat_type: meat_type = 'pork'
elif 'fish' in meat_type: meat_type = 'fish'

thickness = float(sys.argv[2])
surface_area = 0.015
Ti = float(sys.argv[4])
Ta = float(sys.argv[5])
Tr = float(sys.argv[6])


df = pd.read_csv('/Users/Lucas/Apps/Web/mathther-chefs/python/different_meats.csv',index_col = 'Food Type')

k = df.loc[meat_type, 'thermal_conductivity (W/mK)']
rho = df.loc[meat_type, 'density (kg/m3)']
cp = df.loc[meat_type, 'specific_heat (J/kgK)']
#print(k,rho,cp)




########## 1. Thermal properties for the base case (Lean Beef) at near room termperatures ##############

h=28 #Heat transfer coefficient. Includes the effect of radiation (W/mK)
L=thickness #Thickness of the meat cut (m)
A=surface_area # Surface area(m^2)
V=L*A   #Volume (m^3)
#### 1.1 properties dependent on type of meat

k=k #Thermal conductivity of the meat(W/mK)
rho=rho # Density of the meat (kg/m^3)
cp=cp #Specific heat at constant pressure (J/kgK)

#### 1.2 Temperature specification

Ti=Ti+273.15 #Initial temperature of the meat
Ta=Ta+273.15 #Temperature of the oven
Tr=Tr+273.15 # desired temperature (user input)

########## 2. Derived dimensionless numbers ##########
Bi=h*(L/2)/k #Biot number
alpha=k/(rho*cp) #Thermal diffusivity
tc=((L/2)**2)/alpha #characteristic time
theta_r=(Tr-Ta)/(Ti-Ta)

######### 3. Cooking time calcultion ############

#### 3.1 Finding eigen values ####
### For slab the transcendental equation is given by Bi=lambda*tan(lambda)##

number_of_eigen_values=40

def func_tan(x):
    return x*np.tan(x)-Bi 

def sec_to_hours(seconds):
    a=str(seconds//3600)
    b=str((seconds%3600)//60)
    c=str((seconds%3600)%60)
    d=["{} hours {} mins {} seconds".format(a, b, c)]
    return d

guess=np.arange(0.1,10,(10-0.1)/number_of_eigen_values)

res = fsolve(func_tan,guess)
res=np.around(res,6)
eigen_values=np.unique(np.absolute(res))  #eigen values


Fo=np.arange(0,4,0.02)   # Fourier number

x_star=np.arange(0,1,0.01) # dimensionless space grid
T_star=[] #dimensionless temperature
s1=0           
x_center=0 #dimensionless centre
theta=[]

#### 3.2 Theta (dimensionless temp)=A_n*space_func*exp_func

A_n=[2*np.sin(i)/(i+np.sin(i)*np.cos(i)) for i in eigen_values]
space_func=[np.cos(i*x_center) for i in eigen_values]

for k in range(len(Fo)):
    for j in range(len(space_func)):
        s1+=A_n[j]*space_func[j]*np.exp(-(eigen_values[j]**2)*Fo[k])
    theta.append(s1)
    s1=0

Temp=[i*(Ti-Ta)+Ta for i in theta]  #### Temperature profile at the center


for index, val in enumerate(theta):
    if np.absolute(val-theta_r) < 0.01:
        cooking_time=Fo[index]*tc    ###cooking time in seconds

#print("The cooking time is (hrs): ", cooking_time/3600)

######### 4. Temperature in space and time #########
theta_eta=np.zeros((len(Fo),len(x_star)))
s2=0
for k in range(len(Fo)):
    for i in range(len(x_star)):
        for j in range(len(eigen_values)):
            s2+=A_n[j]*np.cos(eigen_values[j]*x_star[i])*np.exp(-(eigen_values[j]**2)*Fo[k])
        theta_eta[k,i]=s2
        s2=0    

theta_eta=np.array(theta_eta)

######## Energy calculation ######
E=V*rho*cp*(Tr-Ti) #Total energy consumed
#print("Energy in kJ is: ", E/1000)
#print("Energy in kWh is: ", E/1000/3600)


data = {
        'time_h': sec_to_hours(cooking_time),
        'energy_kJ': E/1000,
        'energy_kWh': E/1000/3600
    }
  


print(json.dumps(data))
