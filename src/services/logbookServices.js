import { supabase } from "../config/supabase";

// Create a new logbook
export const createLogbook = async (logbook) => {
  const { data, error } = await supabase.from("logbook").insert([logbook]);
  if (error) throw error;
  return data;
};

// Read logbook by user
export const getLogbooksByUser = async (userId) => {
  const { data, error } = await supabase
    .from("logbook")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};

// Update a logbook
export const updateLogbook = async (logbookId, updates) => {
  const { data, error } = await supabase
    .from("logbook")
    .update(updates)
    .eq("id", logbookId);
  if (error) throw error;
  return data;
};

// Delete a logbook
export const deleteLogbook = async (logbookId) => {
  const { data, error } = await supabase
    .from("logbook")
    .delete()
    .eq("id", logbookId);
  if (error) throw error;
  return data;
};
