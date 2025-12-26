import axios from "axios";

export const createProject = async ({
  projectName,
  clientName,
  endDate,
  description,
  userId,
  token,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/dashboard",
      {
        owner_id: userId,
        name: projectName,
        description:description,
        client_name: clientName,
        deadline: endDate.toISOString().split("T")[0],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
    
  } catch (error) {
    console.error("Project creation error", error);
    throw error;
  }
};

export const fetchAllProjects = async (token) => {
  try {
    if (!token) {
      throw new Error("Authorization token missing");
    }

    const { data } = await axios.get("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(
      "Fetch all projects error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteAPI = async ({ id, token }) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/dashboard/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("delte api error", error);
    throw error;
  }
};
