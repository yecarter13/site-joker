import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  "https://api.dicebear.com/7.x/bottts/svg?seed=",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=",
  "https://api.dicebear.com/7.x/icons/svg?seed=",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=",
  "https://api.dicebear.com/7.x/thumbs/svg?seed=",
];

function randomAvatar(username: string): string {
  const style = AVATARS[Math.floor(Math.random() * AVATARS.length)];
  return `${style}${encodeURIComponent(username)}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    const where = all ? {} : { status: "approved" };

    const listings = await prisma.exchangeListing.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    const parsed = listings.map((l) => ({
      ...l,
      images: JSON.parse(l.images || "[]"),
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("GET /api/exchange error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, title, description, city, surface, rooms, price, images, phone } = body;

    if (!username || !title || !city || !surface || !rooms || !price) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const listing = await prisma.exchangeListing.create({
      data: {
        username,
        avatar: randomAvatar(username),
        title,
        description: description || "",
        city,
        surface: parseFloat(surface),
        rooms: parseInt(rooms),
        price: parseFloat(price),
        images: JSON.stringify(images || []),
        phone: phone || "",
        status: "pending",
      },
    });

    return NextResponse.json({ ...listing, images: JSON.parse(listing.images || "[]") });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("POST /api/exchange error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
