from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from analyzer import analyze  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Essay(BaseModel):
    text: str

@app.post("/analyze")
def analyze_essay(essay: Essay):
    result = analyze(essay.text)
    return result