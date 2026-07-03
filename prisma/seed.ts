import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const cities = [
  { city: "Paris", districts: ["11e", "12e", "18e", "Montmartre", "Belleville", "Nation", "République", "Bastille"], lat: 48.8566, lng: 2.3522 },
  { city: "Lyon", districts: ["Presqu'île", "Villeurbanne", "Caluire", "Bron", "Oullins", "Sainte-Foy"], lat: 45.7640, lng: 4.8357 },
  { city: "Marseille", districts: ["Corniche", "Vieux-Port", "Cinq-Avenues", "Saint-Barnabé", "La Rose"], lat: 43.2965, lng: 5.3698 },
  { city: "Toulouse", districts: ["Mirail", "Centre", "Saint-Cyprien", "Rangueil", "Empalot"], lat: 43.6047, lng: 1.4442 },
  { city: "Bordeaux", districts: ["Chartrons", "Saint-Pierre", "Bastide", "Mériadeck", "Caudéran"], lat: 44.8378, lng: -0.5792 },
  { city: "Lille", districts: ["Wazemmes", "Centre", "Vauban", "Moulins", "Fives"], lat: 50.6292, lng: 3.0573 },
  { city: "Nice", districts: ["Promenade", "Cimiez", "Libération", "Riquier", "Gambetta"], lat: 43.7102, lng: 7.2620 },
  { city: "Nantes", districts: ["Trentemoult", "Centre", "Île de Nantes", "Doulon", "Breil"], lat: 47.2184, lng: -1.5536 },
  { city: "Montpellier", districts: ["Centre", "Antigone", "Près d'Arènes", "Port Marianne", "La Paillade"], lat: 43.6108, lng: 3.8767 },
  { city: "Strasbourg", districts: ["Centre", "Orangerie", "Esplanade", "Ménau", "Neuhof"], lat: 48.5734, lng: 7.7521 },
  { city: "Rennes", districts: ["Centre", "Villejean", "Beaulieu", "Cleunay", "Maurepas"], lat: 48.1173, lng: -1.6778 },
  { city: "Grenoble", districts: ["Centre", "Saint-Martin", "Mistral", "Capuche", "Villeneuve"], lat: 45.1885, lng: 5.7245 },
  { city: "Rouen", districts: ["Centre", "Mont-Saint-Aignan", "Sotteville", "Le Petit-Quevilly", "Bois-Guillaume"], lat: 49.4432, lng: 1.0993 },
  { city: "Nancy", districts: ["Centre", "Saint-Max", "Vandoeuvre", "Laxou", "Mon Désert"], lat: 48.6921, lng: 6.1844 },
  { city: "Metz", districts: ["Centre", "Queuleu", "Bellecroix", "Sablon", "Plantières"], lat: 49.1193, lng: 6.1757 },
  { city: "Orléans", districts: ["Centre", "La Source", "Saint-Marceau", "Argonne", "Madeleine"], lat: 47.9029, lng: 1.9090 },
  { city: "Toulon", districts: ["Centre", "Mourillon", "Pont du Las", "Sainte-Musse", "La Rode"], lat: 43.1242, lng: 5.9280 },
  { city: "Le Havre", districts: ["Centre", "Sanvic", "Danton", "Graville", "Mont-Gaillard"], lat: 49.4938, lng: 0.1077 },
  { city: "Dijon", districts: ["Centre", "Fontaine-d'Ouche", "Grésilles", "Maladière", "Chevreuil"], lat: 47.3220, lng: 5.0415 },
  { city: "Angers", districts: ["Centre", "Belle-Beille", "Monplaisir", "Saint-Serge", "Deux Croix"], lat: 47.4784, lng: -0.5632 },
];

const dpeOptions = ["A", "B", "C", "D", "E", "F"];
const heatings = ["Individuel électrique", "Individuel gaz", "Collectif", "Pompe à chaleur", "Solaire"];

let refCounter = 0;

function generateReference(): string {
  refCounter++;
  return `JKR-${refCounter.toString().padStart(4, "0")}`;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBool(prob = 0.5): boolean {
  return Math.random() < prob;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProperty(
  index: number,
  flags: { offreDuMoment?: boolean; premium?: boolean }
) {
  const cityData = cities[index % cities.length];
  const district = pick(cityData.districts);
  const rooms = randomInt(1, 5);
  const bedrooms = Math.max(0, rooms - 1);
  const surface = randomInt(14, 140);
  const price = rooms <= 1 ? randomInt(250, 550) : randomInt(400, 1500);
  const isHLM = randomBool(0.2);

  const titles = [
    `${isHLM ? "HLM" : "Appartement"} ${["F1", "F2", "F3", "F4", "F5"][rooms - 1]} ${cityData.city}`,
    `Studio meublé ${cityData.city}`,
    `Bel appartement ${rooms} pièces ${cityData.city}`,
    `T${rooms} lumineux ${district} - ${cityData.city}`,
    `${isHLM ? "Logement HLM" : "Appartement"} ${surface}m² ${cityData.city}`,
    `Duplex de standing ${cityData.city} - ${district}`,
    `Charmant T${rooms} quartier ${district}`,
    `Superbe appartement vue dégagée ${cityData.city}`,
  ];

  const descs = [
    `Bel appartement situé dans le quartier ${district} à ${cityData.city}. Proche commerces, écoles et transports. Idéal pour couple ou famille.`,
    `À louer dans le quartier ${district} : appartement lumineux et calme. Cuisine équipée, salle de bain moderne, nombreux rangements.`,
    `Joli logement au cœur de ${cityData.city}, quartier ${district}. Commerces à proximité, métro à 5 min. Parfait pour jeunes actifs.`,
    `Appartement en bon état situé dans une résidence calme à ${cityData.city}. Séjour spacieux, chambres lumineuses, cuisine séparée.`,
    `Découvrez ce superbe bien situé à ${cityData.city} dans le quartier ${district}. Prestations de qualité, proche de toutes les commodités.`,
  ];

  const title = titles[index % titles.length];
  const desc = descs[index % descs.length];

  return {
    title,
    description: desc,
    price,
    surface,
    rooms,
    bedrooms,
    bathrooms: randomInt(1, 2),
    floor: randomInt(0, 10),
    furnished: randomBool(0.6),
    heating: pick(heatings),
    elevator: randomBool(0.4),
    parking: randomBool(0.3),
    balcony: randomBool(0.3),
    terrace: randomBool(0.2),
    city: cityData.city,
    district,
    address: `${randomInt(1, 150)} Rue ${pick(["de la République", "Victor Hugo", "Jean Jaurès", "du Général de Gaulle", "des Fleurs", "de la Paix", "Lamarck", "Voltaire", "Pasteur", "Henri Barbusse"])}`,
    type: isHLM ? "HLM" : "Privé",
    dpe: pick(dpeOptions),
    status: "Disponible",
    reference: generateReference(),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    ]),
    latitude: cityData.lat + (Math.random() - 0.5) * 0.1,
    longitude: cityData.lng + (Math.random() - 0.5) * 0.1,
    availabilityDate: `2026-${String(randomInt(6, 12)).padStart(2, "0")}-${String(randomInt(1, 28)).padStart(2, "0")}`,
    fees: Math.round(price * 0.1),
    deposit: price * 2,
    yearBuilt: randomInt(1980, 2024),
    offreDuMoment: flags.offreDuMoment ?? false,
    premium: flags.premium ?? false,
  };
}

const properties: ReturnType<typeof generateProperty>[] = [];

// 15 offreDuMoment
for (let i = 0; i < 15; i++) {
  properties.push(generateProperty(i, { offreDuMoment: true }));
}

// 15 standard (Logement disponible)
for (let i = 15; i < 30; i++) {
  properties.push(generateProperty(i, {}));
}

// 20 premium
for (let i = 30; i < 50; i++) {
  properties.push(generateProperty(i, { premium: true }));
}

async function main() {
  const existing = await prisma.admin.findUnique({ where: { username: "admin" } });
  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
      data: { username: "admin", password: hashed },
    });
    console.log("Admin user created: admin / admin123");
  } else {
    console.log("Admin user already exists");
  }

  const count = await prisma.property.count();
  if (count === 0) {
    for (const prop of properties) {
      await prisma.property.create({ data: prop });
    }
    console.log(`✅ ${properties.length} biens créés`);
  } else {
    await prisma.property.deleteMany({});
    console.log("🗑️  Anciens biens supprimés");
    for (const prop of properties) {
      await prisma.property.create({ data: prop });
    }
    console.log(`✅ ${properties.length} nouveaux biens créés`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
