import axios from "axios";

export const sendInvite = async ({ email, token, projectId }) => {
  const response = await axios.post(
    `http://localhost:5000/api/projects/${projectId}/sendinvite`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
