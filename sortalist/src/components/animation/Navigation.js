import * as React from "react";
import { motion } from "framer-motion";
import { AnimatedMenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ isUserAuth }) => (
  <motion.ul className="mobileNavUl" variants={variants}>
    <AnimatedMenuItem i={0} route={""} pageName={"Home"} />
    <AnimatedMenuItem i={1} route={"instructions"} pageName={"How it works"} />
    <AnimatedMenuItem i={2} route={"about-us"} pageName={"About Us"} />
  </motion.ul>
);
