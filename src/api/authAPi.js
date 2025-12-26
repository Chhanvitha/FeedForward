import { supabase } from "./db";
import axios from "axios";
export const signUp = async ({ email, password, name }) => {
  const { data: user, error } = await supabase.auth.signUp({ email, password });
  const userId = user?.user?.id;
  await supabase
    .from("user_profiles")
    .insert([{ id: userId, email: email, full_name: name }]);
  if (error) {
    throw new Error(error.message);
  }

  return user;
};

export const signInUser = async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", { email: email, password: password });
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
