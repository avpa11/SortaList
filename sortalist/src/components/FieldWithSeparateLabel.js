import { FormLabel, Grid, styled } from "@mui/material";
import React from "react";

export const FieldFormLabel = styled(FormLabel)(({ theme, bold }) => {
  return {
    fontWeight: 400,
    paddingBottom: theme.spacing(1),
    color: theme.palette.common.black,
    "&.Mui-focused": {
      color: theme.palette.common.black,
    },
    fontSize: "smaller",
  };
});

const FieldWithSeparateLabel = ({ label, children }) => {
  return (
    <Grid container mb={2}>
      <Grid item xs={12}>
        <FieldFormLabel>{label}</FieldFormLabel>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default FieldWithSeparateLabel;
