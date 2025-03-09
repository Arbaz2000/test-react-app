import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaClock, FaUser, FaArrowLeft } from "react-icons/fa";
import "./styles.css";

const ActivityDetail = ({ call, onClose }) => {
  return (
    <motion.div
      className="detail-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <button className="back-btn" onClick={onClose}>
        <FaArrowLeft /> Back
      </button>
      <h2>Call Details</h2>
      <div className="detail-item">
        <FaUser /> <strong>From:</strong> {call.from}
      </div>
      <div className="detail-item">
        <FaUser /> <strong>To:</strong> {call.to}
      </div>
      <div className="detail-item">
        <FaPhoneAlt /> <strong>Direction:</strong> {call.direction}
      </div>
      <div className="detail-item">
        <FaClock /> <strong>Time:</strong>{" "}
        {new Date(call.created_at).toLocaleString()}
      </div>
      <div className="detail-item">
        <strong>Duration:</strong> {call.duration} seconds
      </div>
    </motion.div>
  );
};

export default ActivityDetail;
