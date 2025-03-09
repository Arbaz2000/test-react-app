import { useParams, useNavigate } from 'react-router-dom';
import { FiPhoneIncoming, FiPhoneOutgoing, FiPhoneMissed, FiPhoneCall, FiArrowLeft, FiArchive, FiClock, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await fetch(`https://aircall-api.onrender.com/activities/${id}`);
        if (!response.ok) {
          throw new Error('Activity not found');
        }
        const data = await response.json();
        setActivity(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [id]);

  const handleArchive = async () => {
    try {
      await fetch(`https://aircall-api.onrender.com/activities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_archived: !activity.is_archived }),
      });
      toast.success(!activity.is_archived ? 'Call archived successfully' : 'Call unarchived successfully');
      navigate(-1);
    } catch (error) {
      toast.error('Failed to update call status');
      console.error("Error archiving/unarchiving:", error);
    }
  };

  const getCallIcon = () => {
    switch (activity?.call_type?.toLowerCase()) {
      case 'missed':
        return <FiPhoneMissed className="call-type-icon missed" />;
      case 'answered':
        return activity.direction === 'inbound' 
          ? <FiPhoneIncoming className="call-type-icon incoming" />
          : <FiPhoneOutgoing className="call-type-icon outgoing" />;
      default:
        return <FiPhoneCall className="call-type-icon" />;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="activity-details-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="activity-details-container">
        <h2>{error || 'Activity not found'}</h2>
        <button onClick={() => navigate(-1)} className="back-button">
          <FiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="activity-details-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button onClick={() => navigate(-1)} className="back-button">
        <FiArrowLeft /> Back to calls
      </button>

      <div className="activity-details-card">
        <div className="details-header">
          <div className="icon-container">
            {getCallIcon()}
          </div>
          <div className="header-text">
            <h2>{activity.direction === 'inbound' ? 'Incoming Call' : 'Outgoing Call'}</h2>
            <p className="call-type">{activity.call_type.charAt(0).toUpperCase() + activity.call_type.slice(1)}</p>
          </div>
        </div>

        <div className="details-content">
          <div className="contact-grid">
            <div className="contact-item">
              <p className="label">From</p>
              <p className="value">{activity.from || 'Unknown'}</p>
            </div>
            <div className="contact-item">
              <p className="label">To</p>
              <p className="value">{activity.to || 'Unknown'}</p>
            </div>
          </div>

          <div className="time-details">
            <div className="detail-row">
              <FiCalendar />
              <span>{formatDateTime(activity.created_at)}</span>
            </div>

            {activity.duration > 0 && (
              <div className="detail-row">
                <FiClock />
                <span>Duration: {formatDuration(activity.duration)}</span>
              </div>
            )}
          </div>

          <button 
            className="archive-action-button"
            onClick={handleArchive}
          >
            <FiArchive />
            {activity.is_archived ? 'Unarchive Call' : 'Archive Call'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityDetails; 