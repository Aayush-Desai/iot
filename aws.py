#This notebook is similar to Notebook 2 except that the dataset is directly imported from AWS server every time it is run.
#This means the Training set and Testing set also keep changing every time.

#Importing the required libraries

import sys
import json
import time
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import boto3

#User's input

dictIn = json.loads(sys.argv[1])

ph = float(dictIn['ph'])
temp30 = float(dictIn['temp1'])
turb30 = int(dictIn['tur1'])
temp60 = float(dictIn['temp2'])
turb60 = int(dictIn['tur2'])

userIn = [[ph, temp30, turb30, temp60, turb60]]

dictAWS = {}

for i in dictIn.keys():
  if i == 'ph':
    dictAWS['ph'] = ph
  elif i == 'temp1':
    dictAWS['temp30'] = temp30
  elif i == 'tur1':
    dictAWS['turb30'] = turb30
  elif i == 'temp2':
    dictAWS['temp60'] = temp60
  else:
    dictAWS['turb60'] = turb60

#Sending User's input to AWS (Cloud)

myMQTTClient = AWSIoTMQTTClient("lab1_thing")

myMQTTClient.configureEndpoint("", )
myMQTTClient.configureCredentials("")

myMQTTClient.connect()
 


#Pause for around 1 minute for allowing the dataset to update
#This pause is necessary because AWS requires at least 60 seconds to update the dataset with new data
#We are pausing for 70 seconds (instead of 60) to include some buffer time

time.sleep(70)

#Creating the model

client1 = boto3.client(
    'iotanalytics',
    region_name='us-east-2',
    aws_access_key_id='',
    aws_secret_access_key=''
)
dataset = "project_dst"
dataset_url = client1.get_dataset_content(datasetName = dataset)['entries'][0]['dataURI']

df = pd.read_csv(dataset_url)
#df = data.drop(columns = ['__dt'])

x = df[['ph', 'temp30', 'turb30', 'temp60', 'turb60']]

y = df['class']

xTrainSet, xTestSet, yTrainSet, yTestSet = train_test_split(x, y, test_size = 0.3)

knn = KNeighborsClassifier(n_neighbors = 3)
knn.fit(xTrainSet, yTrainSet)

#Predicting for userIn
yPred = knn.predict(userIn)
msg1=int(yPred[0])
print(str(msg1))

dictAWS['class'] = msg1
msg = json.dumps(dictAWS)
topic = "update/environment/dht1"
myMQTTClient.publish(topic, msg, 0) 

myMQTTClient.disconnect()
