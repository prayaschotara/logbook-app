import axios from "@/config/axios";
import { supabase } from "../config/supabase";

export const getEmployees = async () => {
  let { data, error, count } = await supabase.from("employees").select("*");
  if (error) throw error;
  return data;
};

export const getEmployeeById = async (id) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const createEmployee = async (employee) => {
  // Create user in Supabase Auth with role in metadata
  const { data } = await axios.post("/user/signup", {
    email: employee.email,
    password: employee.password,
    role: employee.role.toLowerCase(),
    name: employee.name,
  });
  // Insert employee details into the employees table
  const { data: employeeData, error: dbError } = await supabase
    .from("employees")
    .insert([
      {
        ...employee,
        id: data.user[0].id,
      },
    ]);

  if (dbError) throw dbError;

  return data;
};

export const updateEmployee = async (id, updates) => {
  const { data, error } = await supabase
    .from("employees")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteEmployee = async (id) => {
  const { data, error } = await supabase
    .from("employees")
    .delete()
    .eq("id", id);
  const { data: userData, error: userError } = await supabase
    .from("users")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const getTotalEmployees = async () => {
  const { data, error } = await supabase.from("employees").select("*");
  if (error) throw error;
  return data;
};
