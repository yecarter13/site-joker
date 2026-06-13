import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Use /tmp on Vercel (writable), public/images locally
  const uploadDir =
    process.env.VERCEL === "1"
      ? "/tmp/images"
      : path.join(process.cwd(), "public", "images");

  await mkdir(uploadDir, { recursive: true });

  const uniqueName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, uniqueName);
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/api/images/${uniqueName}` });
}
