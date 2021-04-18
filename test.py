# import sys;
# # print("Hii")
# print(str(sys.argv[1]))
import sys
import json
import numpy as np
import pandas as pd
import KNeighborsClassifier from sklearn.neighbors 

#Creating the model

xTrainSet = pd.read_excel('xTrainSet.xlsx')
yTrainSet = pd.read_excel('yTrainSet.xlsx')
print(sys.argv[1])
knn = KNeighborsClassifier(n_neighbors = 3)
knn.fit(xTrainSet, yTrainSet)

#User's input

dictIn = json.loads(sys.argv[1])

ph = float(dictIn['ph'])
temp30 = float(dictIn['temp1'])
turb30 = int(dictIn['tur1'])
temp60 = float(dictIn['temp2'])
turb60 = int(dictIn['tur2'])

# ph = float(7.74)
# temp30 = float(20.47)
# turb30 = int(207)
# temp60 = float(21.43)
# turb60 = int(134)

userIn = [[ph, temp30, turb30, temp60, turb60]]

#Predicting for userIn

yPred = knn.predict(userIn)
print(yPred[0])