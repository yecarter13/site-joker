import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const listing = await prisma.exchangeListing.update({
      where: { id },
      data: { status: body.status || "approved" },
    });
    return NextResponse.json({ ...listing, images: JSON.parse(listing.images || "[]") });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("PATCH /api/exchange/[id] error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.exchangeListing.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("DELETE /api/exchange/[id] error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
