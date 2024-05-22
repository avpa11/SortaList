import { motion } from "framer-motion";

const MotionIcon = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 0.5 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M30 40 L50 60 L90 20"
        stroke="#3b82f6"
        strokeWidth="10"
        fill="none"
        variants={draw}
        custom={1}
      />
      <motion.line
        x1="110"
        y1="30"
        x2="180"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="10"
        variants={draw}
        custom={2}
      />
      <motion.line
        x1="100"
        y1="65"
        x2="180"
        y2="65"
        stroke="#3b82f6"
        strokeWidth="10"
        variants={draw}
        custom={3}
      />
      <motion.line
        x1="30"
        y1="105"
        x2="110"
        y2="105"
        stroke="#3b82f6"
        strokeWidth="10"
        variants={draw}
        custom={4}
      />
      <motion.line
        x1="30"
        y1="140"
        x2="110"
        y2="140"
        stroke="#3b82f6"
        strokeWidth="10"
        variants={draw}
        custom={5}
      />
      <motion.line
        x1="130"
        y1="140"
        x2="170"
        y2="100"
        stroke="#3b82f6"
        strokeWidth="10"
        variants={draw}
        custom={6}
      />
      <motion.line
        x1="170"
        y1="140"
        x2="130"
        y2="100"
        stroke="#3b82f6"
        strokeWidth="10"
        variants={draw}
        custom={7}
      />
    </motion.svg>
  );
};

export default MotionIcon;
