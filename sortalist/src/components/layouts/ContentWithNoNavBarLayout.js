import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { HeaderContentFooterBox, MiddleContentGrid } from "../styled";

const ContentWithNoNavBarLayout = ({ sx, style }) => {
  return (
    <HeaderContentFooterBox sx={sx} style={style}>
      <MiddleContentGrid container flex={1}>
        <Grid item>
          <Outlet />
        </Grid>
      </MiddleContentGrid>
    </HeaderContentFooterBox>
  );
};

export default ContentWithNoNavBarLayout;
