import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...property, images: JSON.parse(property.images || "[]") });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const property = await prisma.property.update({
    where: { id },
    data: {
      ...body,
      images: typeof body.images === "string" ? body.images : JSON.stringify(body.images || []),
    },
  });
  return NextResponse.json({ ...property, images: JSON.parse(property.images || "[]") });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.property.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
