from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import numpy as np

# Load model ML yang udah kita save
model = joblib.load("model/random_forest_churn.pkl")

# Inisialisasi FastAPI
app = FastAPI(title="Churn Prediction API", description="API buat prediksi pelanggan bakal cabut atau nggak", version="1.0")

# Struktur request yang dikirim user
class ChurnRequest(BaseModel):
    features: list = Field(
        description="List of 19 features in order: [gender, SeniorCitizen, Partner, Dependents, tenure, PhoneService, MultipleLines, InternetService, OnlineSecurity, OnlineBackup, DeviceProtection, TechSupport, StreamingTV, StreamingMovies, Contract, PaperlessBilling, PaymentMethod, MonthlyCharges, TotalCharges]",
        min_items=19,
        max_items=19
    )

    class Config:
        json_schema_extra = {
            "example": {
                "features": [0, 0, 1, 0, 45, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 2, 89.85, 4034.45]
            }
        }

# Endpoint Home (biar keliatan kalau API-nya hidup)
@app.get("/")
def home():
    return {"message": "Welcome to Churn Prediction API 🚀"}

# Endpoint buat Prediksi
@app.post("/predict")
def predict_churn(request: ChurnRequest):
    try:
        # Validasi jumlah features
        if len(request.features) != 19:
            return {
                "error": "Input harus berisi 19 features",
                "features_required": [
                    "gender", "SeniorCitizen", "Partner", "Dependents", "tenure",
                    "PhoneService", "MultipleLines", "InternetService", "OnlineSecurity",
                    "OnlineBackup", "DeviceProtection", "TechSupport", "StreamingTV",
                    "StreamingMovies", "Contract", "PaperlessBilling", "PaymentMethod",
                    "MonthlyCharges", "TotalCharges"
                ],
                "features_provided": request.features
            }

        # Ambil data dari user
        input_data = np.array(request.features).reshape(1, -1)

        # Prediksi churn
        prediction = model.predict(input_data)[0]  # Hasil: 0 = Gak Churn, 1 = Churn
        prob = model.predict_proba(input_data)[0][1]  # Probabilitas Churn
        
        # Balikin hasil prediksi ke user
        return {
            "prediction": int(prediction),
            "probability": float(prob),
            "status": "Churn" if prediction == 1 else "Gak Churn"
        }
    except Exception as e:
        return {"error": str(e)}
        raise HTTPException(status_code=400, detail=str(e))
