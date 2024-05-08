import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import NavBar from "../NavBar";
import { HeaderContentFooterBox, MiddleContentGrid } from "../styled";

const MiddleContentWithTopBarLayout = ({ sx, style }) => {
  return (
    <HeaderContentFooterBox sx={sx} style={style}>
      <NavBar />

      <MiddleContentGrid container flex={1}>
        <Grid item>
          <Outlet />
        </Grid>
      </MiddleContentGrid>
    </HeaderContentFooterBox>
  );
};

export default MiddleContentWithTopBarLayout;
