import axios from "axios";

export const uploadAssets = async ({ formData, token }) => {
  try {
    // project_id is already in formData from UploadAssets.jsx
    
    const response = await axios.post(
      "http://localhost:5000/api/assets/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading assets:", error);
    throw error;
  }
};
