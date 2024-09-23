import { supabase } from "@/config/supabase";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, role, name } = await req.json();

  // Check if the user already exists
  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUserError && existingUserError.code !== "PGRST116") {
    return NextResponse.json(
      {
        error: "Error checking existing user",
      },
      { status: 500 }
    );
  }

  if (existingUser) {
    return NextResponse.json(
      {
        error: "User already exists",
      },
      { status: 409 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, role, name }])
    .single();

  if (insertError) {
    return NextResponse.json(
      {
        error: "Error creating user",
      },
      { status: 500 }
    );
  }
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  console.log("api", user);

  return NextResponse.json(
    { message: "User created successfully", user },
    { status: 201 }
  );
}
