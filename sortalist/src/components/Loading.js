import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const SPINNER_SIZE = 44;

const Loading = ({ localBackdrop = false, spinnerSize = SPINNER_SIZE }) => {
  return (
    <Backdrop open sx={{ position: localBackdrop ? "absolute" : "fixed" }}>
      <CircularProgress size={spinnerSize} />
    </Backdrop>
  );
};

export default Loading;
