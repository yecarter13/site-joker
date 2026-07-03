import Image from "next/image";

const logos = [
  { src: "/partenairess.svg", alt: "Partenaire 1" },
  { src: "/partenaires.webp", alt: "Partenaire 2" },
  { src: "/partenaire.webp", alt: "Partenaire 3" },
  { src: "/téléchargement.png", alt: "Partenaire 4" },
  { src: "/téléchargement (1).png", alt: "Partenaire 5" },
  { src: "/téléchargement (2).png", alt: "Partenaire 6" },
  { src: "/téléchargement (1).jpg", alt: "Partenaire 7" },
  { src: "/téléchargement (2).jpg", alt: "Partenaire 8" },
  { src: "/téléchargement (3).jpg", alt: "Partenaire 9" },
];

export default function PartenairesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Nos <span className="text-blue-600">partenaires</span>
        </h2>
        <p className="text-gray-500 mt-2">Ils nous font confiance</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-20 items-center w-max">
          {[...logos, ...logos].map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={100}
              className="flex-shrink-0 object-contain h-28 w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
