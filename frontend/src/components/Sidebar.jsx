import React from "react";
import AudioRecorder from "./AudioRecorder";
import "../styles/Sidebar.css";

const Sidebar = ({ setFields }) => {
  return (
    <div className="sidebar">
      <AudioRecorder setFields={setFields} />
       <div className="sidebar-footer">© 2025 DSAMC</div>
    </div>
  );
};

export default Sidebar;


