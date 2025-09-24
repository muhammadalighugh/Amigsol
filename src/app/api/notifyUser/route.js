// src/app/api/notifyUser/route.js
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import nodemailer from "nodemailer";

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();
const auth = getAuth();

export async function POST(request) {
  try {
    const { applicationId, status, token } = await request.json();

    // Verify Firebase ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken.email.endsWith("@gmail.com")) {
        return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      return NextResponse.json({ error: "Invalid or missing token" }, { status: 401 });
    }

    // Fetch application data
    const applicationRef = doc(db, "partnerApplications", applicationId);
    const applicationSnap = await applicationRef.get();
    if (!applicationSnap.exists()) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    const applicationData = applicationSnap.data();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: applicationData.email,
      subject: `Partnership Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      text: `Dear ${applicationData.fullName},\n\nYour partnership application has been ${status}.\n\nThank you,\nAdmin Team`,
    };

    await transporter.sendMail(mailOptions);

    // Create admin notification
    await db.collection("adminNotifications").add({
      userId: applicationData.userId,
      email: applicationData.email,
      fullName: applicationData.fullName,
      partnershipType: applicationData.partnershipType,
      status,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Notification sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing notification:", {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ error: "Failed to process notification" }, { status: 500 });
  }
}