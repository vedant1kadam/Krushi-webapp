from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS

# Load models
fertilizer_model = pickle.load(open('fertilizer_model.pkl', 'rb'))
fertilizer_scaler = pickle.load(open('fertilizer_scaler.pkl', 'rb'))
fertilizer_encoder = pickle.load(open('fertilizer_label_encoder.pkl', 'rb'))
crop_model = pickle.load(open('model.pkl', 'rb'))
crop_scaler = pickle.load(open('standscaler.pkl', 'rb'))
crop_minmax = pickle.load(open('minmaxscaler.pkl', 'rb'))

app = Flask(__name__)
CORS(app)

# Update model loading
soil_encoder = pickle.load(open('soil_label_encoder.pkl', 'rb'))
crop_type_encoder = pickle.load(open('crop_label_encoder.pkl', 'rb'))

@app.route("/predict/fertilizer", methods=["POST"])
def predict_fertilizer():
    try:
        data = request.get_json()
        
        # Encode soil type and crop type
        soil_type_encoded = soil_encoder.transform([data['soil_type']])[0]
        crop_type_encoded = crop_type_encoder.transform([data['crop_type']])[0]
        
        # Prepare input data for fertilizer prediction
        input_data = np.array([[
            data['nitrogen'],
            data['phosphorus'],
            data['potassium'],
            data['temperature'],
            data['humidity'],
            data['moisture'],
            soil_type_encoded,
            crop_type_encoded
        ]])
        
        # Scale input for fertilizer prediction
        input_scaled = fertilizer_scaler.transform(input_data)
        
        # Make fertilizer prediction
        fert_prediction = fertilizer_model.predict(input_scaled)[0]
        fertilizer_name = fertilizer_encoder.inverse_transform([fert_prediction])[0]
        
        # Prepare input for crop prediction
        crop_input = np.array([[
            data['nitrogen'],
            data['phosphorus'],
            data['potassium'],
            data['temperature'],
            data['humidity'],
            data['ph'],
            data['rainfall']
        ]])
        
        # Scale input for crop prediction
        crop_mx_features = crop_minmax.transform(crop_input)
        crop_sc_features = crop_scaler.transform(crop_mx_features)
        
        # Make crop prediction
        crop_prediction = crop_model.predict(crop_sc_features)[0]
        
        # Crop dictionary
        crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut",
            6: "Papaya", 7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon",
            11: "Grapes", 12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil",
            16: "Blackgram", 17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas",
            20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
        }
        
        crop_name = crop_dict.get(crop_prediction, "Unknown")
        
        return jsonify({
            "fertilizer_result": f"Recommended fertilizer: {fertilizer_name}",
            "fertilizer": fertilizer_name,
            "crop_result": f"Recommended crop: {crop_name}",
            "crop": crop_name
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)