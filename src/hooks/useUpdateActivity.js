import axios from "axios";

const BASE_URL = "https://aircall-api.onrender.com/activities";

const useUpdateActivity = (setActivities) => {
  const toggleArchive = async (id, isArchived) => {
    try {
      await axios.patch(`${BASE_URL}/${id}`, { is_archived: !isArchived });
      setActivities((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_archived: !isArchived } : item
        )
      );
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return { toggleArchive };
};

export default useUpdateActivity;
