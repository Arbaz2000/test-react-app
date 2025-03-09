import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://aircall-api.onrender.com/activities";

const useFetchActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, setActivities, loading };
};

export default useFetchActivities;
