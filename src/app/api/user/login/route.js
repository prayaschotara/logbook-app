import { supabase } from "@/config/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  // Fetch user from the database
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !users) {
    return NextResponse.json(
      {
        error: "Invalid email or password",
      },
      { status: 401 }
    );
  }

  const user = users;

  // Compare the provided password with the stored hashed password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      {
        error: "Invalid email or password",
      },
      { status: 401 }
    );
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  cookies().set("token", token);
  return NextResponse.json({ user }, { status: 200 });
}
