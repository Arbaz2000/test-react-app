import ActivityFeed from "../components/active/ActivityFeed";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const handleArchiveAll = async () => {
    try {
      const response = await fetch('https://aircall-api.onrender.com/activities');
      const activities = await response.json();
      const activeActivities = activities.filter(activity => !activity.is_archived);
      
      const promises = activeActivities.map((activity) =>
        fetch(`https://aircall-api.onrender.com/activities/${activity.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_archived: true }),
        }),
      );
      
      await Promise.all(promises);
      toast.success('All calls archived successfully', {
        autoClose: 5000
      });
      window.location.reload();
    } catch (error) {
      toast.error('Failed to archive all calls', {
        autoClose: 5000
      });
      console.error('Error archiving all calls:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Activity Feed</h1>
          <button 
            className="archive-all-btn"
            onClick={handleArchiveAll}
          >
            Archive All
          </button>
        </div>
      </header>
      <main className="home-content">
        <ActivityFeed />
      </main>
    </div>
  );
};

export default Home;
