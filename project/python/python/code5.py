import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import warnings
import pickle
import os
warnings.filterwarnings("ignore")

# Create models directory
save_dir = "c:/Users/kadam/OneDrive/Desktop/test4/flask-server/models"
os.makedirs(save_dir, exist_ok=True)

# Load dataset
# Load dataset and print columns to check names
df = pd.read_csv("c:/Users/kadam/OneDrive/Desktop/test4/python/Fertilizer Prediction.csv")
print("Available columns:", df.columns.tolist())

# Update column names to match the CSV
le_crop = LabelEncoder()
le_fertilizer = LabelEncoder()
df['Crop Type'] = le_crop.fit_transform(df['Crop Type'])  # Changed from 'Crop' to 'Crop Type'
df['Fertilizer Name'] = le_fertilizer.fit_transform(df['Fertilizer Name'])  # Changed from 'Fertilizer' to 'Fertilizer Name'

# Update feature names to match
X = df[['Nitrogen', 'Potassium', 'Phosphorous', 'Crop Type']]  # Changed 'Crop' to 'Crop Type'
y = df['Fertilizer Name']  # Changed from 'Fertilizer' to 'Fertilizer Name'

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Models
rf = RandomForestClassifier()
dt = DecisionTreeClassifier()
lr = LogisticRegression()

rf.fit(X_train, y_train)
dt.fit(X_train, y_train)
lr.fit(X_train, y_train)

# Fertilizer suggestion text dictionary
fertilizer_dic = {
    'NHigh': "N is high. Suggestions: Use green manure, mulch, legumes, etc.",
    'Nlow': "N is low. Suggestions: Add manure, use NPK fertilizer with high N, etc.",
    'PHigh': "P is high. Suggestions: Avoid manure, use phosphorus-free fertilizer, etc.",
    'Plow': "P is low. Suggestions: Use bone meal, phosphate, manure, compost, etc.",
    'KHigh': "K is high. Suggestions: Water soil, avoid K fertilizers, add calcium sources.",
    'Klow': "K is low. Suggestions: Use potash, banana peels, seaweed, etc."
}

def get_fertilizer_feedback(n, p, k):
    feedback = []

    if n > 120:
        feedback.append(fertilizer_dic['NHigh'])
    elif n < 90:
        feedback.append(fertilizer_dic['Nlow'])

    if p > 100:
        feedback.append(fertilizer_dic['PHigh'])
    elif p < 40:
        feedback.append(fertilizer_dic['Plow'])

    if k > 120:
        feedback.append(fertilizer_dic['KHigh'])
    elif k < 20:
        feedback.append(fertilizer_dic['Klow'])

    return "\n\n".join(feedback) if feedback else "Nutrient levels are optimal."

def predict_fertilizer(n, p, k, crop_name):
    # Encode crop
    crop_encoded = le_crop.transform([crop_name])[0]
    input_data = [[n, p, k, crop_encoded]]

    rf_pred = le_fertilizer.inverse_transform(rf.predict(input_data))[0]
    dt_pred = le_fertilizer.inverse_transform(dt.predict(input_data))[0]
    lr_pred = le_fertilizer.inverse_transform(lr.predict(input_data))[0]

    feedback = get_fertilizer_feedback(n, p, k)

    return {
        "Random Forest Prediction": rf_pred,
        "Decision Tree Prediction": dt_pred,
        "Logistic Regression Prediction": lr_pred,
        "Fertilizer Advice": feedback
    }

# Example usage
if __name__ == "__main__":
    n = 85
    p = 60
    k = 30
    crop = "Cotton"  # Must match one from the dataset

    result = predict_fertilizer(n, p, k, crop)

    for model, prediction in result.items():
        print(f"{model}:\n{prediction}\n")

# Add after the main block:
# Print and save model accuracies
rf_acc = accuracy_score(y_test, rf.predict(X_test))
dt_acc = accuracy_score(y_test, dt.predict(X_test))
lr_acc = accuracy_score(y_test, lr.predict(X_test))

print(f"\nModel Accuracies:")
print(f"Random Forest: {rf_acc:.2f}")
print(f"Decision Tree: {dt_acc:.2f}")
print(f"Logistic Regression: {lr_acc:.2f}")

# Save models and encoders
pickle.dump(rf, open(os.path.join(save_dir, 'rf_model.pkl'), 'wb'))
pickle.dump(dt, open(os.path.join(save_dir, 'dt_model.pkl'), 'wb'))
pickle.dump(lr, open(os.path.join(save_dir, 'lr_model.pkl'), 'wb'))
pickle.dump(le_crop, open(os.path.join(save_dir, 'crop_encoder.pkl'), 'wb'))
pickle.dump(le_fertilizer, open(os.path.join(save_dir, 'fertilizer_encoder.pkl'), 'wb'))
pickle.dump(fertilizer_dic, open(os.path.join(save_dir, 'fertilizer_dict.pkl'), 'wb'))
