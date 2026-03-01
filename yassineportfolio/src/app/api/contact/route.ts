import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple helper to escape HTML
function escapeHtml(text: string) {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Length validation
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Input too long" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chahidyc15@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Sanitize inputs for HTML
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPhone = phone ? escapeHtml(phone) : "Not provided";
    const sanitizedSubject = escapeHtml(subject);
    const sanitizedMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `"Portfolio Contact" <chahidyc15@gmail.com>`,
      to: "chahidyc15@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${sanitizedSubject} - from ${sanitizedName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 },
    );
  }
}
