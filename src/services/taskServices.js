import { supabase } from "../config/supabase";

export const getTasks = async () => {
  let { data, error, count } = await supabase.from("tasks").select("*");
  if (error) throw error;
  return data;
};

export const getTaskByUserId = async (id) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", id);
  if (error) throw error;
  return data;
};

export const createTask = async (task) => {
  // Create task in Supabase
  const { data, error } = await supabase.from("tasks").insert([task]);

  if (error) throw error;

  return data;
};

export const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteTask = async (id) => {
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
  return data;
};
