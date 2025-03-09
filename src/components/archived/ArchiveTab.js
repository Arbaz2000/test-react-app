import useFetchActivities from "../../hooks/useFetchActivities";
import useUpdateActivity from "../../hooks/useUpdateActivity";
import ActivityItem from "../activity-details/ActivityItem";
import LoadingSpinner from "../ui/loader/LoadingSpinner";

const ArchiveTab = () => {
  const { activities, setActivities, loading } = useFetchActivities();
  const { toggleArchive } = useUpdateActivity(setActivities);

  if (loading) return <LoadingSpinner />;

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
