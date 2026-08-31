# import os
# import base64
# import io
# import json  # Add this import
# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# import openai
# from google import genai
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI(title="Food Nutrition Detector")

# # CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# NUTRITION_PROMPT = """
# You are an expert nutritionist and food analyst. Analyze the food in the image provided.
# Respond ONLY with a valid JSON object in the following format, with no markdown or additional text:

# {
#   "dish_name": "String, the specific name of the dish",
#   "confidence_score": 0.95,
#   "nutrition_per_100g": {
#     "calories_kcal": 250,
#     "protein_g": 15.5,
#     "carbs_g": 30.2,
#     "fat_g": 8.7,
#     "fiber_g": 4.5
#   },
#   "estimated_serving_size_g": 200,
#   "ingredients": ["ingredient1", "ingredient2"],
#   "allergens": ["allergen1", "allergen2"],
#   "health_tips": ["tip1", "tip2"]
# }
# """

# @app.get("/")
# async def root():
#     return {"message": "Food Nutrition API is running!", "endpoints": ["/analyze", "/docs"]}

# @app.post("/analyze")
# async def analyze_food(file: UploadFile = File(...)):
#     if not file.content_type.startswith("image/"):
#         raise HTTPException(status_code=400, detail="File must be an image.")
    
#     try:
#         # Read and compress image
#         image_bytes = await file.read()
#         image = Image.open(io.BytesIO(image_bytes))
        
#         max_size = 1024
#         if max(image.size) > max_size:
#             image.thumbnail((max_size, max_size))
        
#         buffered = io.BytesIO()
#         image.save(buffered, format="JPEG", quality=80)
#         img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
#         # Call OpenAI Vision Model
#         response = await client.chat.completions.create(
#             model="gpt-4o",
#             messages=[
#                 {
#                     "role": "user",
#                     "content": [
#                         {"type": "text", "text": NUTRITION_PROMPT},
#                         {
#                             "type": "image_url",
#                             "image_url": {
#                                 "url": f"data:image/jpeg;base64,{img_base64}",
#                                 "detail": "low"
#                             }
#                         }
#                     ]
#                 }
#             ],
#             response_format={"type": "json_object"},
#             max_tokens=500,
#             temperature=0.2
#         )
        
#         # Parse the response as JSON
#         result_text = response.choices[0].message.content
#         result_data = json.loads(result_text)  # Use json.loads instead of eval
        
#         return JSONResponse(content={"status": "success", "data": result_data})
        
#     except json.JSONDecodeError as e:
#         print("JSON Parse Error:", e)
#         print("Response text:", result_text if 'result_text' in locals() else "No response")
#         raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
#     except openai.APIError as e:
#         print("OpenAI Error:", e)
#         raise HTTPException(status_code=500, detail=f"AI Service Error: {str(e)}")
#     except Exception as e:
#         print("Unexpected Error:", e)
#         raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")




import os
import io
import json

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
from google import genai
from google.genai import types
from dotenv import load_dotenv


# =========================
# LOAD ENVIRONMENT VARIABLES
# =========================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is not set in the .env file."
    )


# =========================
# FASTAPI APP
# =========================

app = FastAPI(
    title="Food Nutrition Detector"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# GEMINI CLIENT
# =========================

client = genai.Client(
    api_key=GEMINI_API_KEY
)


# =========================
# NUTRITION PROMPT
# =========================

NUTRITION_PROMPT = """
You are an expert nutritionist and food analyst.

Analyze the food shown in the image.

Respond ONLY with a valid JSON object.
Do not include markdown.
Do not include ```json.
Do not include any explanation outside the JSON.

Use exactly this structure:

{
  "dish_name": "String",
  "confidence_score": 0.95,
  "nutrition_per_100g": {
    "calories_kcal": 250,
    "protein_g": 15.5,
    "carbs_g": 30.2,
    "fat_g": 8.7,
    "fiber_g": 4.5
  },
  "estimated_serving_size_g": 200,
  "ingredients": [
    "ingredient1",
    "ingredient2"
  ],
  "allergens": [
    "allergen1",
    "allergen2"
  ],
  "health_tips": [
    "tip1",
    "tip2"
  ]
}

Rules:

1. Identify the most likely dish.
2. Provide a confidence score between 0 and 1.
3. Estimate nutrition values based on the visible food.
4. Nutrition values must represent approximately 100g of the food.
5. Estimate the serving size shown in the image.
6. List likely ingredients.
7. List common allergens if applicable.
8. Provide useful health tips.
9. If the food cannot be identified confidently, still return valid JSON.
10. Never return anything outside the JSON object.
"""


# =========================
# ROOT ENDPOINT
# =========================

@app.get("/")
async def root():
    return {
        "message": "Food Nutrition API is running!",
        "endpoints": [
            "/analyze",
            "/docs"
        ]
    }


# =========================
# FOOD ANALYSIS
# =========================

@app.post("/analyze")
async def analyze_food(
    file: UploadFile = File(...)
):

    # Check file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image."
        )

    try:

        # =========================
        # READ IMAGE
        # =========================

        image_bytes = await file.read()

        image = Image.open(
            io.BytesIO(image_bytes)
        )

        # =========================
        # RESIZE IMAGE
        # =========================

        max_size = 1024

        if max(image.size) > max_size:
            image.thumbnail(
                (max_size, max_size)
            )

        # =========================
        # CONVERT TO JPEG
        # =========================

        buffered = io.BytesIO()

        image.convert("RGB").save(
            buffered,
            format="JPEG",
            quality=80
        )

        image_data = buffered.getvalue()

        # =========================
        # GEMINI VISION REQUEST
        # =========================

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=[
                types.Part.from_bytes(
                    data=image_data,
                    mime_type="image/jpeg"
                ),
                NUTRITION_PROMPT
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2
            )
        )

        # =========================
        # GET GEMINI RESPONSE
        # =========================

        result_text = response.text

        if not result_text:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an empty response."
            )

        print("Gemini Response:")
        print(result_text)

        # =========================
        # PARSE JSON
        # =========================

        result_data = json.loads(
            result_text
        )

        # =========================
        # RETURN RESULT
        # =========================

        return JSONResponse(
            content={
                "status": "success",
                "data": result_data
            }
        )

    # =========================
    # INVALID JSON
    # =========================

    except json.JSONDecodeError as e:

        print(
            "JSON Parse Error:",
            e
        )

        print(
            "Response:",
            result_text
            if "result_text" in locals()
            else "No response"
        )

        raise HTTPException(
            status_code=500,
            detail="Gemini returned an invalid JSON response."
        )

    # =========================
    # GEMINI / API ERROR
    # =========================

    except Exception as e:

        print(
            "Food Analysis Error:",
            repr(e)
        )

        raise HTTPException(
            status_code=500,
            detail=f"Food analysis failed: {str(e)}"
        )

