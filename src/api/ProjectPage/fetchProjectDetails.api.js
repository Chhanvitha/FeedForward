import axios from "axios";

export const fetchProjectDetails = async ({ projectID, token }) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/projects/${projectID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};
