from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import sys
import json
import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier 

myMQTTClient = AWSIoTMQTTClient("lab1_thing")

myMQTTClient.configureEndpoint("", )
myMQTTClient.configureCredentials("")

myMQTTClient.connect()


xTrainSet = pd.read_excel('xTrainSet.xlsx')
yTrainSet = pd.read_excel('yTrainSet.xlsx')
#print(sys.argv[1])
knn = KNeighborsClassifier(n_neighbors = 3)
knn.fit(xTrainSet, yTrainSet)

#User's input

dictIn = json.loads(sys.argv[1])
#print(dictIn)

ph = float(dictIn['ph'])
temp30 = float(dictIn['temp1'])
turb30 = int(dictIn['tur1'])
temp60 = float(dictIn['temp2'])
turb60 = int(dictIn['tur2'])


userIn = [[ph, temp30, turb30, temp60, turb60]]

#Predicting for userIn

yPred = knn.predict(userIn)

msg=int(yPred[0])
topic="tt"

myMQTTClient.publish(topic,msg, 0)  
print(str(msg))
myMQTTClient.disconnect()
