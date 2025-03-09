import { FiArchive, FiPhoneCall, FiPhoneIncoming, FiPhoneOutgoing, FiPhoneMissed } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './ActivityItem.css';

const ActivityItem = ({ activity, onArchive, isArchiveView }) => {
  const getCallIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'incoming':
        return <FiPhoneIncoming className="call-type-icon incoming" />;
      case 'outgoing':
        return <FiPhoneOutgoing className="call-type-icon outgoing" />;
      case 'missed':
        return <FiPhoneMissed className="call-type-icon missed" />;
      default:
        return <FiPhoneCall className="call-type-icon" />;
    }
  };

  const handleArchiveClick = () => {
    const newArchiveState = isArchiveView ? false : true;
    onArchive(activity.id, newArchiveState);
  };

  return (
    <motion.div 
      className="activity-item"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="activity-content">
        <div className="call-header">
          {getCallIcon(activity.call_type)}
          <div className="call-participants">
            <span className="from">{activity.from}</span>
            <span className="arrow">→</span>
            <span className="to">{activity.to}</span>
          </div>
        </div>
        
        <div className="call-details">
          {activity.duration && (
            <div className="duration">
              <strong>Duration: </strong>{activity.duration}
            </div>
          )}
          {activity.timestamp && (
            <div className="timestamp">
              <strong>Time: </strong>{new Date(activity.timestamp).toLocaleString()}
            </div>
          )}
        </div>
      </div>
      
      <motion.button
        className="archive-button"
        onClick={handleArchiveClick}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: '#f0f0f0' 
        }}
        whileTap={{ scale: 0.95 }}
        title={isArchiveView ? "Unarchive" : "Archive"}
      >
        <FiArchive size={20} />
      </motion.button>
    </motion.div>
  );
};

export default ActivityItem;
