import { motion } from "framer-motion";

export function Logo({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16 md:w-20 md:h-20"
  };

  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={`${sizes[size]} text-primary`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer hexagon */}
      <path 
        d="M12 2L22 7V17L12 22L2 17V7L12 2Z" 
        className="stroke-primary"
      />
      
      {/* Inner tool elements */}
      <path 
        d="M8 8.5L16 8.5" 
        className="stroke-primary"
        strokeWidth="1.5"
      />
      <path 
        d="M8 12L16 12" 
        className="stroke-primary"
        strokeWidth="1.5"
      />
      <path 
        d="M8 15.5L16 15.5" 
        className="stroke-primary"
        strokeWidth="1.5"
      />
      
      {/* Decorative elements */}
      <circle 
        cx="6" 
        cy="8.5" 
        r="1" 
        className="fill-primary"
      />
      <circle 
        cx="18" 
        cy="8.5" 
        r="1" 
        className="fill-primary"
      />
      <circle 
        cx="6" 
        cy="12" 
        r="1" 
        className="fill-primary"
      />
      <circle 
        cx="18" 
        cy="12" 
        r="1" 
        className="fill-primary"
      />
      <circle 
        cx="6" 
        cy="15.5" 
        r="1" 
        className="fill-primary"
      />
      <circle 
        cx="18" 
        cy="15.5" 
        r="1" 
        className="fill-primary"
      />

      {/* Optional: Add animation paths */}
      <motion.path
        d="M12 2L12 22"
        className="stroke-primary/20"
        strokeDasharray="0 1"
        animate={{
          strokeDasharray: ["0 1", "1 0"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.svg>
  );
} 