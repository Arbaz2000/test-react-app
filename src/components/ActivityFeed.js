import useFetchActivities from "../hooks/useFetchActivities";
import useUpdateActivity from "../hooks/useUpdateActivity";
import ActivityItem from "./ActivityItem";
import { motion } from "framer-motion";
import './ActivityFeed.css';

const ActivityFeed = () => {
  const { activities, setActivities, loading } = useFetchActivities();
  const { toggleArchive } = useUpdateActivity(setActivities);

  console.log('Activities:', activities);

  if (loading) return (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  );

  return (
    <motion.div 
      className="feed-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {activities && activities.length > 0 ? (
        activities
          .filter((act) => !act.is_archived)
          .map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              onArchive={toggleArchive}
            />
          ))
      ) : (
        <p className="no-activities">No activities found</p>
      )}
    </motion.div>
  );
};

export default ActivityFeed;
