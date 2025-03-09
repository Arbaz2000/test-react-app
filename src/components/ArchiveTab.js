import useFetchActivities from "../hooks/useFetchActivities";
import useUpdateActivity from "../hooks/useUpdateActivity";
import ActivityItem from "./ActivityItem";

const ArchiveTab = () => {
  const { activities, setActivities, loading } = useFetchActivities();
  const { toggleArchive } = useUpdateActivity(setActivities);

  if (loading) return (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  );

  return (
    <div className="feed-container">
      {activities
        .filter((act) => act.is_archived)
        .map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onArchive={toggleArchive}
            isArchiveView={true}
          />
        ))}
    </div>
  );
};

export default ArchiveTab;
