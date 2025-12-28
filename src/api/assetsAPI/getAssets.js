import axios from "axios";

export const getAssets = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`http://localhost:5000/api/assets/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};
