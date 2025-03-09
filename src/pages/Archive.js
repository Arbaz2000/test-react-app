import ArchiveTab from "../components/archived/ArchiveTab";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "./Archive.css";

const Archive = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await fetch('https://aircall-api.onrender.com/activities');
      const data = await response.json();
      setActivities(data.filter(activity => activity.is_archived));
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleUnarchiveAll = async () => {
    try {
      const promises = activities.map((activity) =>
        fetch(`https://aircall-api.onrender.com/activities/${activity.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_archived: false }),
        }),
      );
      await Promise.all(promises);
      toast.success('All calls unarchived successfully', {
        autoClose: 5000
      });
      window.location.reload();
    } catch (error) {
      toast.error('Failed to unarchive all calls', {
        autoClose: 5000
      });
      console.error("Error unarchiving all:", error);
    }
  };

  return (
    <div className="archive-container">
      <header className="archive-header">
        <div className="header-content">
          <h1>Archived Calls</h1>
          <button 
            className="unarchive-all-btn"
            onClick={handleUnarchiveAll}
          >
            Unarchive All
          </button>
        </div>
      </header>
      <main className="archive-content">
        <ArchiveTab />
      </main>
    </div>
  );
};

export default Archive;
