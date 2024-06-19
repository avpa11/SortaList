import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const BlobWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 50%;
  z-index: ${({ zIndex }) => zIndex};
`;

const Blob = ({ top, left, size, color, zIndex }) => {
  return (
    <BlobWrapper
      zIndex={zIndex}
      top={top}
      left={left}
      size={size}
      color={color}
      as={motion.div}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        y: [0, 20, -20, 0],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
};

export default Blob;
