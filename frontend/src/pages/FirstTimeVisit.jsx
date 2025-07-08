import React from "react";
import "../styles/FirstTimeVisit.css";

const FirstTimeVisit = ({ fields }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copying to clipboard was successful!");
        alert("Copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="first-time-visit">
      <div className="title-container">
        <h2>IVF Consultation Page</h2>
        <img src="/img2.gif" alt="Decoration" className="title-gif" />
      </div>
      <div className="fields">
        <div className="field-group">
          <label htmlFor="previous-investigation">Previous Investigation:</label>
          <div className="textarea-container">
            <textarea
              id="previous-investigation"
              className="neumorphic-input"
              value={fields.previousInvestigation || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.previousInvestigation)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="previous-ivf-trials">Previous IVF Trials:</label>
          <div className="textarea-container">
            <textarea
              id="previous-ivf-trials"
              className="neumorphic-input"
              value={fields.previousIVFTrials || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.previousIVFTrials)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="current-medications">Use of Medications currently:</label>
          <div className="textarea-container">
            <textarea
              id="current-medications"
              className="neumorphic-input"
              value={fields.currentMedications || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.currentMedications)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="family-history">Family History:</label>
          <div className="textarea-container">
            <textarea
              id="family-history"
              className="neumorphic-input"
              value={fields.familyHistory || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.familyHistory)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="patient-history">Patient History:</label>
          <div className="textarea-container">
            <textarea
              id="patient-history"
              className="neumorphic-input"
              value={fields.patientHistory || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.patientHistory)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="pt-impression">PT Impression / Diagnosis:</label>
          <div className="textarea-container">
            <textarea
              id="pt-impression"
              className="neumorphic-input"
              value={fields.ptImpression || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.ptImpression)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="problem-list">Problem List:</label>
          <div className="textarea-container">
            <textarea
              id="problem-list"
              className="neumorphic-input"
              value={fields.problemList || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.problemList)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="doppler">Doppler:</label>
          <div className="textarea-container">
            <textarea
              id="doppler"
              className="neumorphic-input"
              value={fields.doppler || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.doppler)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="others-clinical-notes">Others - Clinical Notes:</label>
          <div className="textarea-container">
            <textarea
              id="others-clinical-notes"
              className="neumorphic-input"
              value={fields.othersClinicalNotes || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.othersClinicalNotes)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="plan-of-treatment">Plan Of Treatment:</label>
          <div className="textarea-container">
            <textarea
              id="plan-of-treatment"
              className="neumorphic-input"
              value={fields.planOfTreatment || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.planOfTreatment)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="consultation-note">Consultation Note:</label>
          <div className="textarea-container">
            <textarea
              id="consultation-note"
              className="neumorphic-input"
              value={fields.consultationNote || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.consultationNote)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="patient-instructions">Patient Instructions:</label>
          <div className="textarea-container">
            <textarea
              id="patient-instructions"
              className="neumorphic-input"
              value={fields.patientInstructions || ""}
              readOnly
            ></textarea>
            <div
              className="copy-icon-container"
              onClick={() => copyToClipboard(fields.patientInstructions)}
            >
              <i className="fas fa-copy copy-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeVisit;



