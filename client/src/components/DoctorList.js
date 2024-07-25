import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/doctor/book-appointment/${doctor._id}`);
  };

  return (
    <div className="card m-3" style={cardStyle} onClick={handleCardClick}>
      <div className="card-header" style={headerStyle}>
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className="card-body" style={bodyStyle}>
        <p style={infoStyle}>
          <b>Specialization:</b> {doctor.specialization}
        </p>
        <p style={infoStyle}>
          <b>Experience:</b> {doctor.experience} years
        </p>
        <p style={infoStyle}>
          <b>Fees Per Consultation:</b> {doctor.feePerConsultation}
        </p>
        {doctor.timings && (
          <p style={infoStyle}>
            <b>Timings:</b> {doctor.timings.start} - {doctor.timings.end}
          </p>
        )}
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  overflow: "hidden",
  width: "270px", // Adjust the width as needed
  transition: "transform 0.3s ease-in-out",
  ":hover": {
    transform: "scale(1.05)",
  },
};

const headerStyle = {
  backgroundColor: "#a7a7a7", 
  color: "#fff",
  padding: "20px",
  fontSize: "1.5rem",
  textAlign: "center",
};

const bodyStyle = {
  padding: "20px",
};

const infoStyle = {
  marginBottom: "15px",
  fontSize: "1.1rem",
};

export default DoctorList;
