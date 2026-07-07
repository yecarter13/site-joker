import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueName = `${Date.now()}-${file.name}`;

  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(uniqueName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrl } = supabaseAdmin.storage
    .from("images")
    .getPublicUrl(uniqueName);

  return NextResponse.json({ url: publicUrl.publicUrl });
}
