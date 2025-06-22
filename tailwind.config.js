import animate from "tailwindcss-animate";
export default {
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
