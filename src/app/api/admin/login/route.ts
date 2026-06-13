import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const cookieStore = await cookies();
  cookieStore.set("admin_token", admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token) return NextResponse.json({ authenticated: false });

  const admin = await prisma.admin.findUnique({ where: { id: token.value } });
  return NextResponse.json({ authenticated: !!admin });
}
