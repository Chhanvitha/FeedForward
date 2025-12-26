import axios from "axios";

export const InvitedProjectApi = async ({ token }) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/invitedprojects",
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error in fetching Invited project", error);
    throw error;
  }
};
