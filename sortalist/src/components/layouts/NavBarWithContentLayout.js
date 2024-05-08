import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import NavBar from "../NavBar";
import { HeaderContentFooterBox } from "../styled";

const TopBarLayout = ({ sx, style }) => {
  return (
    <HeaderContentFooterBox sx={sx} style={style}>
      <NavBar />

        <Grid item>
          <Outlet />
        </Grid>
    </HeaderContentFooterBox>
  );
};

export default TopBarLayout;
