import ActivityFeed from "../components/ActivityFeed";
import "./Home.css";

const Home = () => {
  const handleArchiveAll = async () => {
    try {
      const response = await fetch('/api/calls/archive-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to archive all calls');
      }
      
      // Refresh the activity feed or update state as needed
      window.location.reload();
    } catch (error) {
      console.error('Error archiving all calls:', error);
      // Handle error (e.g., show error message to user)
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
