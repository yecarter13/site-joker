import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const maxPrice = searchParams.get("maxPrice");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (city) where.city = { contains: city };
    if (maxPrice) where.price = { lte: parseFloat(maxPrice) };
    if (type) where.type = type;
    if (status) where.status = status;

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const parsed = properties.map((p) => ({
      ...p,
      images: JSON.parse(p.images || "[]"),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const count = await prisma.property.count();
    const reference = body.reference || `JKR-${(count + 1).toString().padStart(4, "0")}`;
    const property = await prisma.property.create({
      data: {
        ...body,
        reference,
        images: JSON.stringify(body.images || []),
      },
    });
    return NextResponse.json({ ...property, images: JSON.parse(property.images || "[]") });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
