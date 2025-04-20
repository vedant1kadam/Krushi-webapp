from flask import Flask,request,render_template
import numpy as np
import pandas
import sklearn
import pickle

model = pickle.load(open('model.pkl','rb'))
sc = pickle.load(open('standscaler.pkl','rb'))
mx = pickle.load(open('minmaxscaler.pkl','rb'))


# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template("index.html")

# @app.route("/predict",methods=['POST'])
# def predict():
#     N = request.form['Nitrogen']
#     P = request.form['Phosporus']
#     K = request.form['Potassium']
#     temp = request.form['Temperature']
#     humidity = request.form['Humidity']
#     ph = request.form['pH']
#     rainfall = request.form['Rainfall']

#     feature_list = [N, P, K, temp, humidity, ph, rainfall]
#     single_pred = np.array(feature_list).reshape(1, -1)

#     mx_features = mx.transform(single_pred)
#     sc_mx_features = sc.transform(mx_features)
#     prediction = model.predict(sc_mx_features)

#     crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
#                  8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
#                  14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
#                  19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"}

#     if prediction[0] in crop_dict:
#         crop = crop_dict[prediction[0]]
#         result = "{} is the best crop to be cultivated right there".format(crop)
#     else:
#         result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
#     return render_template('index.html',result = result)


# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS  # Allow frontend to talk to backend

model = pickle.load(open('model.pkl','rb'))
sc = pickle.load(open('standscaler.pkl','rb'))
mx = pickle.load(open('minmaxscaler.pkl','rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()  # Get JSON from frontend

    try:
        N = float(data['nitrogen'])
        P = float(data['phosphorus'])
        K = float(data['potassium'])
        temp = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])

        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)

        mx_features = mx.transform(single_pred)
        sc_mx_features = sc.transform(mx_features)
        prediction = model.predict(sc_mx_features)

        crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut",
            6: "Papaya", 7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon",
            11: "Grapes", 12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil",
            16: "Blackgram", 17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas",
            20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
        }

        crop = crop_dict.get(prediction[0], "Unknown")
        return jsonify({"result": f"{crop} is the best crop to be cultivated right there"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib  # or use pickle, depending on your model
# import numpy as np

# model = pickle.load(open('model.pkl','rb'))
# sc = pickle.load(open('standscaler.pkl','rb'))
# mx = pickle.load(open('minmaxscaler.pkl','rb'))


# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Load your ML model (change the path if needed)
# model = joblib.load("crop_prediction_model.pkl")

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()

#         # Extract and validate input
#         features = [
#             data["nitrogen"],
#             data["phosphorus"],
#             data["potassium"],
#             data["temperature"],
#             data["humidity"],
#             data["ph"],
#             data["rainfall"],
#         ]

#         # Ensure values are floats (you can add more validation here if needed)
#         input_array = np.array(features).reshape(1, -1)

#         # Predict using the ML model
#         prediction = model.predict(input_array)
#         result = prediction[0]  # e.g., "Rice", "Wheat", etc.

#         return jsonify({"result": f"{result} is the best crop to be cultivated right there"})

#     except Exception as e:
#         print("Prediction error:", e)
#         return jsonify({"error": "An error occurred during prediction"}), 500

# if __name__ == "__main__":
#     app.run(debug=True)