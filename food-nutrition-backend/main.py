import os
import base64
import io
import json  # Add this import
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import openai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Food Nutrition Detector")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

NUTRITION_PROMPT = """
You are an expert nutritionist and food analyst. Analyze the food in the image provided.
Respond ONLY with a valid JSON object in the following format, with no markdown or additional text:

{
  "dish_name": "String, the specific name of the dish",
  "confidence_score": 0.95,
  "nutrition_per_100g": {
    "calories_kcal": 250,
    "protein_g": 15.5,
    "carbs_g": 30.2,
    "fat_g": 8.7,
    "fiber_g": 4.5
  },
  "estimated_serving_size_g": 200,
  "ingredients": ["ingredient1", "ingredient2"],
  "allergens": ["allergen1", "allergen2"],
  "health_tips": ["tip1", "tip2"]
}
"""

@app.get("/")
async def root():
    return {"message": "Food Nutrition API is running!", "endpoints": ["/analyze", "/docs"]}

@app.post("/analyze")
async def analyze_food(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")
    
    try:
        # Read and compress image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        max_size = 1024
        if max(image.size) > max_size:
            image.thumbnail((max_size, max_size))
        
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG", quality=80)
        img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        # Call OpenAI Vision Model
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": NUTRITION_PROMPT},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{img_base64}",
                                "detail": "low"
                            }
                        }
                    ]
                }
            ],
            response_format={"type": "json_object"},
            max_tokens=500,
            temperature=0.2
        )
        
        # Parse the response as JSON
        result_text = response.choices[0].message.content
        result_data = json.loads(result_text)  # Use json.loads instead of eval
        
        return JSONResponse(content={"status": "success", "data": result_data})
        
    except json.JSONDecodeError as e:
        print("JSON Parse Error:", e)
        print("Response text:", result_text if 'result_text' in locals() else "No response")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except openai.APIError as e:
        print("OpenAI Error:", e)
        raise HTTPException(status_code=500, detail=f"AI Service Error: {str(e)}")
    except Exception as e:
        print("Unexpected Error:", e)
        raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")

