from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models and encoders
models_dir = "c:/Users/kadam/OneDrive/Desktop/test4/flask-server/models"
rf_model = pickle.load(open(os.path.join(models_dir, 'rf_model.pkl'), 'rb'))
dt_model = pickle.load(open(os.path.join(models_dir, 'dt_model.pkl'), 'rb'))
lr_model = pickle.load(open(os.path.join(models_dir, 'lr_model.pkl'), 'rb'))
le_crop = pickle.load(open(os.path.join(models_dir, 'crop_encoder.pkl'), 'rb'))
le_fertilizer = pickle.load(open(os.path.join(models_dir, 'fertilizer_encoder.pkl'), 'rb'))
fertilizer_dic = pickle.load(open(os.path.join(models_dir, 'fertilizer_dict.pkl'), 'rb'))

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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract values from request
        n = float(data['nitrogen'])
        p = float(data['phosphorous'])
        k = float(data['potassium'])
        crop_name = data['crop']

        # Encode crop
        crop_encoded = le_crop.transform([crop_name])[0]
        input_data = [[n, k, p, crop_encoded]]  # Note the order: N, K, P to match training data

        # Get predictions from all models
        rf_pred = le_fertilizer.inverse_transform(rf_model.predict(input_data))[0]
        dt_pred = le_fertilizer.inverse_transform(dt_model.predict(input_data))[0]
        lr_pred = le_fertilizer.inverse_transform(lr_model.predict(input_data))[0]

        # Get feedback on nutrient levels
        feedback = get_fertilizer_feedback(n, p, k)

        return jsonify({
            "random_forest_prediction": rf_pred,
            "decision_tree_prediction": dt_pred,
            "logistic_regression_prediction": lr_pred,
            "fertilizer_advice": feedback
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)