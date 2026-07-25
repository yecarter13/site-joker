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

export async function GET() {
  try {
    const listings = await prisma.exchangeListing.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(listings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("GET /api/exchange error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, title, description, city, surface, rooms, price, whatsapp } = body;

    if (!username || !title || !city || !surface || !rooms || !price || !whatsapp) {
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
        whatsapp,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("POST /api/exchange error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
