// src/app/api/validateAdminSecret/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { secretKey } = await request.json();
    if (secretKey === process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ valid: true }, { status: 200 });
    }
    return NextResponse.json({ valid: false, error: "Invalid secret key" }, { status: 401 });
  } catch (error) {
    console.error("Error validating secret key:", error);
    return NextResponse.json({ valid: false, error: "Server error" }, { status: 500 });
  }
}