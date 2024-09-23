import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Get the token from cookies
    const token = cookies().get("token");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Clear the token from cookies
    cookies().set("token", "", { maxAge: -1 });

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
