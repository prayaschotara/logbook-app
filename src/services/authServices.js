import axios from "@/config/axios";
import { supabase } from "../config/supabase";

export const signUp = async (email, password) => {
  const { data } = await axios.post("/user/signup", { email, password });
  if (error) throw error;
  return user;
};

export const signIn = async (email, password) => {
  try {
    const { data } = await axios.post("/user/login", { email, password });
    return data;
  } catch (error) {
    return error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getUser = async () => {
  const data = await supabase.auth.getUser();
  console.log(data);
  if (!data) throw new Error("No user logged in");
  return data;
};

export const updateUserRole = async (userId, role) => {
  const { data, error } = await supabase
    .from("user_roles")
    .upsert({ user_id: userId, role });
  if (error) throw error;
  return data;
};
