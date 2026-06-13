interface HexagonImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HexagonImage({ src, alt, className = "" }: HexagonImageProps) {
  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="hexElongatedClip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.18,0.04
              C 0.20,0.02 0.25,0.01 0.28,0.01
              L 0.72,0.01
              C 0.75,0.01 0.80,0.02 0.82,0.04
              L 0.96,0.44
              C 0.98,0.48 0.98,0.52 0.96,0.56
              L 0.82,0.96
              C 0.80,0.98 0.75,0.99 0.72,0.99
              L 0.28,0.99
              C 0.25,0.99 0.20,0.98 0.18,0.96
              L 0.04,0.56
              C 0.02,0.52 0.02,0.48 0.04,0.44
              Z
            " />
          </clipPath>
        </defs>
      </svg>
      <div className="w-full h-full overflow-hidden" style={{ clipPath: "url(#hexElongatedClip)" }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
