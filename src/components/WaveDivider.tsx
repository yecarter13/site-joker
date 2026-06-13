interface WaveDividerProps {
  color?: string;
  flipped?: boolean;
}

export default function WaveDivider({ color = "#ffffff", flipped = false }: WaveDividerProps) {
  return (
    <div className="relative w-full h-16 md:h-24 -mt-1 -mb-1 overflow-hidden">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute w-full h-full"
        style={{ transform: flipped ? "rotate(180deg)" : undefined }}
      >
        <path
          fill={color}
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,50 1440,50 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}
