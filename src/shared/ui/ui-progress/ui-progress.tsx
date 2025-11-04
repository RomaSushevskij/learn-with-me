export const UiProgress = ({
  progress,
  startCount = 5,
  starSize = 32,
  spacing = 16,
}: {
  progress: number;
  startCount?: number;
  starSize?: number; // размер одной звезды
  spacing?: number; // расстояние между звездами
}) => {
  const stars = Array(startCount).fill(0);
  const width = stars.length * (starSize + spacing) - spacing + 8;
  const height = starSize + 4;
  const color = "oklch(87.9% 0.169 91.605)";

  return (
    <div className="flex justify-center bg-indigo-500/30 p-2 rounded-full">
      <svg width={width} height={height} viewBox={`-4 0 ${width} ${height}`}>
        <defs>
          {/* Общий clipPath для всех звезд */}
          <clipPath id="starsClip">
            {stars.map((_, i) => {
              const xOffset = i * (starSize + spacing);
              return (
                <polygon
                  key={i}
                  points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10"
                  transform={`translate(${xOffset}, 0) scale(${starSize / 24})`}
                />
              );
            })}
          </clipPath>

          {/* Заливка с прогрессом */}
          <linearGradient id="grad">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Прогресс-заливка */}
        <rect
          x={0}
          y={0}
          width={width * progress}
          height={height}
          fill={color}
          clipPath="url(#starsClip)"
        />

        {/* Контур всех звезд поверх заливки */}
        {stars.map((_, i) => {
          const xOffset = i * (starSize + spacing);
          return (
            <polygon
              key={i}
              points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10"
              transform={`translate(${xOffset}, 0.1) scale(${starSize / 24})`}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
};
