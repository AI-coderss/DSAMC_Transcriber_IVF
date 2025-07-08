from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import os
import tempfile
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
app = Flask(__name__)
CORS(app, origins=[
    "https://dsamc-transcriber-ivf-ekthar-center.onrender.com"], supports_credentials=True)


openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai

def speech_to_text(audio_data_path):
    with open(audio_data_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            response_format="text",
            file=audio_file
        )
    return {"text": transcript}

def extract_fields(transcript):
    prompt = f"""
        You are a medical transcription service provider. Your main task is to extract all relevant fields of text from the transcript: {transcript}
        and display them in a user form format. Please strictly adhere to the following format template and use medical terms:
        **Previous Investigation:**
        **Previous IVF Trials:**
        **Use of Medications currently:**
        **Family History:**
        **Patient History:**
        **PT Impression / Diagnosis:**
        **Problem List:**
        **Doppler:**
        **Others - Clinical Notes:**
        **Plan Of Treatment:**
        **Consultation Note:**
        **Patient Instructions:**
        Display each field on a new line, do not combine them into one sentence. Your main job is to facilitate data entry for doctors. Use Medical terminologies to describe the cases.
    """
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def get_response(user_query):
    template = """
    You are a doctor AI assistant. Your main task is to provide medical diagnosis, recommend lab tests and investigations,
    and prescribe the appropriate drugs based on the user's input reply in English only.
    User's input: {user_query}
    Based on the user's input, provide a helpful and detailed response your answers must be always in English only in English regardless of the user's input language.
    follow the following format :
    based on the descrbied case
    The diagnosis : 
    The recommended lab test and investigation: list them 
    Drug prescriptions: prescribe the appropriate drugs based on the diagnosis
    Recommendations to The Doctor: recommend the doctor with regards to case what they supposed to do ?
    Treatment plan : set the appropriate treatment plan for the doctor including the steps to treat the Patient
    Please stricly adhere to the above format wherever asked , be more specific and detailed in your answers 
    """
    prompt = ChatPromptTemplate.from_template(template)
    llm = ChatOpenAI(model="gpt-4o")
    chain = prompt | llm | StrOutputParser()

    return chain.invoke({
        "user_query": user_query,
    })

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json()
    user_query = data.get("input")

    if not user_query:
        return jsonify({"error": "User input is required"}), 400

    try:
        response = get_response(user_query)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/")
def index():
    return jsonify({"message": "Welcome to the backend!"})

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio_data" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400  
    audio_file = request.files["audio_data"]
    supported_formats = ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm']
    file_extension = audio_file.filename.split('.')[-1].lower()
    if file_extension not in supported_formats:
        return jsonify({"error": f"Unsupported file format: {file_extension}. Supported formats: {supported_formats}"}), 400
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_extension}") as temp_audio:
        audio_file.save(temp_audio.name)
        temp_audio_path = temp_audio.name
    try:
        transcript_result = speech_to_text(temp_audio_path)
    finally:
        os.remove(temp_audio_path)

    return jsonify({"transcript": transcript_result.get("text", "")})

@app.route("/extract_fields", methods=["POST"])
def extract():
    data = request.get_json()
    transcript = data.get("transcript", "")
    if not transcript:
        return jsonify({"error": "No transcript provided"}), 400

    fields_result = extract_fields(transcript)
    fields = {
        "previousInvestigation": fields_result.split("**Previous Investigation:**")[1].split("**Previous IVF Trials:**")[0].strip(),
        "previousIVFTrials": fields_result.split("**Previous IVF Trials:**")[1].split("**Use of Medications currently:**")[0].strip(),
        "currentMedications": fields_result.split("**Use of Medications currently:**")[1].split("**Family History:**")[0].strip(),
        "familyHistory": fields_result.split("**Family History:**")[1].split("**Patient History:**")[0].strip(),
        "patientHistory": fields_result.split("**Patient History:**")[1].split("**PT Impression / Diagnosis:**")[0].strip(),
        "ptImpression": fields_result.split("**PT Impression / Diagnosis:**")[1].split("**Problem List:**")[0].strip(),
        "problemList": fields_result.split("**Problem List:**")[1].split("**Doppler:**")[0].strip(),
        "doppler": fields_result.split("**Doppler:**")[1].split("**Others - Clinical Notes:**")[0].strip(),
        "othersClinicalNotes": fields_result.split("**Others - Clinical Notes:**")[1].split("**Plan Of Treatment:**")[0].strip(),
        "planOfTreatment": fields_result.split("**Plan Of Treatment:**")[1].split("**Consultation Note:**")[0].strip(),
        "consultationNote": fields_result.split("**Consultation Note:**")[1].split("**Patient Instructions:**")[0].strip(),
        "patientInstructions": fields_result.split("**Patient Instructions:**")[1].strip(),
    }
    return jsonify(fields)

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)