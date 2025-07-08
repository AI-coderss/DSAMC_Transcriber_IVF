# DSAMS Transcriber

DSAMS Transcriber is a full-stack web application designed to assist medical professionals in transcribing and structuring patient consultation notes, especially for IVF (In Vitro Fertilization) consultations. The app leverages AI (OpenAI GPT and Whisper) to transcribe audio, extract structured medical fields, and provide AI-powered second opinions.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Customization](#customization)
- [License](#license)

---

## Features

- 🎤 **Audio Recording & Transcription:** Record patient consultations and transcribe them using OpenAI Whisper.
- 📝 **Automatic Field Extraction:** Extracts structured medical fields from transcripts for IVF consultations.
- 🤖 **AI Second Opinion:** Get AI-generated medical opinions, diagnosis, and treatment plans.
- 📋 **Easy Copy:** Copy any field's content to clipboard with a single click.
- 🖥️ **Responsive UI:** Clean, modern, and responsive interface for desktop and mobile.
- 🔒 **CORS Support:** Secure backend with CORS for local and deployed environments.

---

## Project Structure

```
dsams-transcriber/
│
├── backend/
│   └── app.py                # Flask backend for transcription and AI
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── img2.gif          # Decorative image for UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── FirstTimeVisit.jsx
│   │   │   ├── AISecondOpinion.jsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Sidebar.css
│   │   │   ├── FirstTimeVisit.css
│   │   │   ├── AudioRecorder.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Backend Setup

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```

2. **Install Python dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the backend directory with your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. **Run the Flask server:**
   ```sh
   python app.py
   ```
   The backend will start on the default Flask port (usually 5000).

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```sh
   npm install
   ```

3. **Start the React development server:**
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

- **Backend:**  
  - `OPENAI_API_KEY` (required): Your OpenAI API key for GPT and Whisper models.

- **Frontend:**  
  - No special environment variables required for local development.

---

## Usage

1. **Record Audio:**  
   Use the audio recorder in the sidebar to record a patient consultation.

2. **Transcription & Extraction:**  
   The backend transcribes the audio and extracts the following fields:
   - Previous Investigation
   - Previous IVF Trials
   - Use of Medications currently
   - Family History
   - Patient History
   - PT Impression / Diagnosis
   - Problem List
   - Doppler
   - Others - Clinical Notes
   - Plan Of Treatment
   - Consultation Note
   - Patient Instructions

3. **Copy Fields:**  
   Click the copy icon next to any field to copy its content.

4. **AI Second Opinion:**  
   Navigate to the "AI Second Opinion" page for AI-generated diagnosis and recommendations.

---

## Customization

- **Styling:**  
  Modify CSS files in `frontend/src/styles/` to change the look and feel.

- **Field Extraction Logic:**  
  Update the `extract_fields` function in `backend/app.py` to change how fields are extracted from transcripts.

- **Routes & Components:**  
  Add or modify React components in `frontend/src/components/` and `frontend/src/pages/` as needed.

---

## License

This project is for educational and internal use. For commercial or clinical deployment, ensure compliance with medical data privacy regulations and obtain appropriate licenses for AI models.
