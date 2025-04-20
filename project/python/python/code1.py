import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt
import seaborn as sns
from IPython import get_ipython
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier, ExtraTreeClassifier
from sklearn.ensemble import RandomForestClassifier, BaggingClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score


Crop = pd.read_csv('Crop_recommendation.csv')
print(Crop.head())

data = pd.read_csv("Soil Nutrients.csv")
print(data.head())

print(Crop['label'].unique())
print(data['Name'].unique())

print(Crop['label'].value_counts())
print(data['Name'].value_counts())

data = pd.read_csv("Soil Nutrients.csv")
A=data.copy()

A.rename(columns={'Name':'label','Nitrogen':'N','Phosphorus':'P',
                  'Potassium':'K','Temperature':'temperature','Rainfall':'rainfall',
                  'pH':'ph'},inplace=True)
print(A.head())
a = A.drop(['Fertility','Photoperiod','Soil_Type','Season','N_Ratio',
          'P_Ratio','K_Ratio','Category_pH','Light_Hours','Light_Intensity','Rh','Yield']
          ,axis = 1)

print(Crop.head())
print(a.head())


X=Crop.drop('label',axis = 1)
y=Crop['label']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state=42)

from sklearn.preprocessing import MinMaxScaler
mx = MinMaxScaler()
X_train = mx.fit_transform(X_train)
X_test = mx.transform(X_test)

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
sc.fit(X_train)
X_train = sc.transform(X_train)
X_test=sc.transform(X_test)

models = {
    'LogisticRegression': LogisticRegression(),
    'GaussianNB':GaussianNB(),
    'SVC':SVC(),
    'KNeighborsClassifier':KNeighborsClassifier(),
    'DecisionTreeClassifier':DecisionTreeClassifier(),
    'ExtraTreeClassifier':ExtraTreeClassifier(),
    'RandomForestClassifier':RandomForestClassifier(),
    'BaggingClassifier':BaggingClassifier(),
    'GradientBoostingClassifier':GradientBoostingClassifier(),
}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    score = accuracy_score(y_test, y_pred)
    print(f"{name} model with accuracy: {score}")

randclf = RandomForestClassifier()
randclf.fit(X_train, y_train)
y_pred = randclf.predict(X_test)
accuracy_score(y_test, y_pred)

def recommendation(N,P,K,temperature,humidity,ph,rainfall):
    features = np.array([[N,P,K,temperature,humidity,ph,rainfall]])
    mx_features = mx.fit_transform(features)
    sc_mx_features = sc.fit_transform(mx_features)
    prediction = randclf.predict(sc_mx_features).reshape(1,-1)
    return prediction[0]

N=90
P= 42
K= 43
temperature= 20.879744
humidity=82.002744
ph=6.502985
Rainfall=202.935536

predict = recommendation(N,P,K,temperature,humidity,ph,Rainfall)

print(predict)

import pickle
pickle.dump(randclf, open('model.pkl', 'wb'))
pickle.dump(mx, open('minmaxscaler.pkl', 'wb'))
pickle.dump(sc, open('standscaler.pkl', 'wb'))