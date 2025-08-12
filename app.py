from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your Next.js frontend

with open('models/creditcard_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    result = model.predict(features)[0]
    return jsonify({'prediction': int(result)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
