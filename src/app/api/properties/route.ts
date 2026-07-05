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
      images: JSON.parse(p.images),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: "Erreur de connexion à la base de données." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const property = await prisma.property.create({
      data: {
        ...body,
        images: JSON.stringify(body.images || []),
      },
    });
    return NextResponse.json({ ...property, images: JSON.parse(property.images) });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du logement. Vérifiez que la base de données est accessible et que les migrations sont à jour." },
      { status: 500 }
    );
  }
}
