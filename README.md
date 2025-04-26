# Krushi-webapp

# 🌾 AgroAssist

**An Intelligent Crop and Fertilizer Recommendation System**

---

## 📖 Project Overview

AgroAssist is a modern web application designed to help farmers and agricultural planners make better decisions about **which crops to grow** and **what fertilizers to apply** based on **soil quality parameters**.

Leveraging **Machine Learning (ML)** on a **Flask (Python) backend** and a beautiful **TypeScript/React frontend**, AgroAssist empowers users with **data-driven agricultural insights**, leading to optimized crop yields, better soil health, and sustainable farming practices.

---

## 🎯 Key Features

- 🌱 Crop Recommendation based on soil parameters like Nitrogen, Phosphorus, Potassium, pH, temperature, and humidity.
- 🧪 Fertilizer Recommendation based on nutrient deficiencies.
- 📊 Data-Driven Decisions using trained ML models (Random Forest, KNN, Logistic Regression).
- ⚡ Fast and Responsive Frontend using React, TypeScript, and Tailwind CSS.
- 🔥 Robust Backend APIs built with Flask and scikit-learn.
- 📚 Real Soil Datasets incorporated, curated from national soil surveys and research.
- 💬 Instant Notifications and Feedback with beautiful toasts and modals.
- 🌎 Scalable and Extensible architecture for future upgrades.

---

## 🧩 Tech Stack

### 🖥️ Frontend
- Vite — Fast build tool
- React — Component-based UI
- TypeScript — Strongly typed JavaScript
- Tailwind CSS — Utility-first styling
- shadcn/ui — Beautiful prebuilt UI components
- React Hook Form — Form management
- Lucide React — Icon set
- Recharts — Charts and visualizations
- Sonner — Toast notifications
- Radix UI Primitives — Accessible components

### ⚙️ Backend
- Python 3 — Core language
- Flask — Web server and API framework
- Pandas — Data manipulation
- Scikit-learn — Machine Learning models
- NumPy — Numerical operations

### 🛢️ Database & Hosting
- Supabase — Backend-as-a-service (optional)

---

## 🧠 Core Functionalities

### 🚜 Crop Recommendation
- User enters soil parameters (N, P, K, pH, temp, humidity).
- Model predicts the most suitable crop based on trained ML classifiers.

### 🌿 Fertilizer Recommendation
- Soil nutrient levels are checked against optimal thresholds.
- System suggests type and quantity of fertilizers.

### 🧹 Data Preprocessing
- Normalization and scaling of input features.
- Label encoding for crop outputs.

### 📈 Model Training
- Random Forest, K-Nearest Neighbors, Logistic Regression classifiers.
- Model evaluation using Accuracy, Precision, Recall, F1-Score.

---

## 📦 Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/agro-assist.git
cd agro-assist
\`\`\`

### 2. Setup Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### 3. Setup Backend

\`\`\`bash
cd backend
pip install -r requirements.txt
python app.py
\`\`\`

Make sure Flask backend is running at http://localhost:5000.

---

## 🧪 Sample API Request

### POST /predict-crop

\`\`\`json
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 25,
  "humidity": 80,
  "ph": 6.5,
  "rainfall": 200
}
\`\`\`

Response:

\`\`\`json
{
  "predicted_crop": "rice"
}
\`\`\`

---

## 📚 Folder Structure

\`\`\`bash
agro-assist/
├── frontend/     # React + TypeScript frontend
├── backend/      # Flask backend
├── README.md     # This file
├── docs/         # Documentation and Reports
└── datasets/     # Soil and crop datasets
\`\`\`

---

## 🚀 Future Scope

- 🛰️ Integration with weather APIs for real-time recommendation.
- 🌎 Geo-location based soil predictions.
- 📈 Dynamic fertilizer dosage suggestions based on crop growth stages.
- 🧠 Advanced ML models like XGBoost and Deep Learning.
- 📱 Mobile application for offline assistance.

---

## 🤝 Contributing

Contributions are welcome! 🚀

1. Fork the repo
2. Create your feature branch (\`git checkout -b feature/your-feature\`)
3. Commit your changes (\`git commit -m 'Add some feature'\`)
4. Push to the branch (\`git push origin feature/your-feature\`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

---

## 📞 Contact

> Made with ❤️ by **Your Name**

- GitHub: [Vedant kadam](https://github.com/vedant1kadam)
- LinkedIn: [Here](https://www.linkedin.com/in/vedant-kadam-3118a3252/)

---

# 🚀 Let's revolutionize agriculture with data-driven solutions! 🌾



