import * as React from "react";
import { motion } from "framer-motion";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const AnimatedMenuItem = ({ i, route, pageName }) => {
  const navigate = useNavigate();
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="mobileNavLi"
    >
      <div className="icon-placeholder" style={style} />
      <Typography>
        <Link underline="none" onClick={() => navigate(`/${route}`)}>
          {pageName}
        </Link>
      </Typography>
    </motion.li>
  );
};
