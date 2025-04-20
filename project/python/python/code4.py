import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import pickle

# Load and preprocess fertilizer data
# Update file paths
fertilizer_data = pd.read_csv("c:/Users/kadam/OneDrive/Desktop/test4/python/Fertilizer Prediction.csv")
crop_data = pd.read_csv("c:/Users/kadam/OneDrive/Desktop/test4/python/Crop_recommendation.csv")

# Prepare features and target for fertilizer prediction
X_fert = fertilizer_data[['Nitrogen', 'Phosphorous', 'Potassium', 'Temparature', 'Humidity ', 'Moisture', 'Soil Type', 'Crop Type']]
y_fert = fertilizer_data['Fertilizer Name']

# Prepare features and target for crop prediction
X_crop = crop_data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y_crop = crop_data['label']

# Encode categorical variables for fertilizer prediction
le_soil = LabelEncoder()
le_crop = LabelEncoder()
le_fert = LabelEncoder()

X_fert['Soil Type'] = le_soil.fit_transform(X_fert['Soil Type'])
X_fert['Crop Type'] = le_crop.fit_transform(X_fert['Crop Type'])
y_fert = le_fert.fit_transform(y_fert)

# Train fertilizer model
X_train_fert, X_test_fert, y_train_fert, y_test_fert = train_test_split(X_fert, y_fert, test_size=0.2, random_state=42)

fert_scaler = StandardScaler()
X_train_fert_scaled = fert_scaler.fit_transform(X_train_fert)
X_test_fert_scaled = fert_scaler.transform(X_test_fert)

fert_model = XGBClassifier(random_state=42)
fert_model.fit(X_train_fert_scaled, y_train_fert)

# Train crop model
X_train_crop, X_test_crop, y_train_crop, y_test_crop = train_test_split(X_crop, y_crop, test_size=0.2, random_state=42)

crop_minmax = MinMaxScaler()
crop_scaler = StandardScaler()

X_train_crop_mx = crop_minmax.fit_transform(X_train_crop)
X_train_crop_scaled = crop_scaler.fit_transform(X_train_crop_mx)

crop_model = XGBClassifier(random_state=42)
crop_model.fit(X_train_crop_scaled, y_train_crop)

# Save fertilizer models and preprocessors
# Update save paths to match server1.py location
model_path = "c:/Users/kadam/OneDrive/Desktop/test4/flask-server/"
pickle.dump(fert_model, open(model_path + 'fertilizer_model.pkl', 'wb'))
pickle.dump(fert_scaler, open(model_path + 'fertilizer_scaler.pkl', 'wb'))
pickle.dump(le_fert, open(model_path + 'fertilizer_label_encoder.pkl', 'wb'))
pickle.dump(le_soil, open(model_path + 'soil_label_encoder.pkl', 'wb'))
pickle.dump(le_crop, open(model_path + 'crop_label_encoder.pkl', 'wb'))

# Save crop models and preprocessors
pickle.dump(crop_model, open(model_path + 'model.pkl', 'wb'))
pickle.dump(crop_scaler, open(model_path + 'standscaler.pkl', 'wb'))
pickle.dump(crop_minmax, open(model_path + 'minmaxscaler.pkl', 'wb'))

# Print model accuracies
print("Fertilizer Model Accuracy:", fert_model.score(X_test_fert_scaled, y_test_fert))
print("Crop Model Accuracy:", crop_model.score(crop_scaler.transform(crop_minmax.transform(X_test_crop)), y_test_crop))