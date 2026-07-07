import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const filename = segments.join("/");

  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  const ext = filename.split(".").pop()?.toLowerCase();

  const { data, error } = await supabase.storage
    .from("images")
    .download(filename);

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(data, {
    headers: {
      "Content-Type": mimeTypes[ext || ""] || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
