import { Box, Button, Grid, TextField, styled } from "@mui/material";

export const WhiteCardBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(4),
  border: "1px solid #C8C8C8",
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(2, 2),
  width: "inherit",
  [theme.breakpoints.up("sm")]: {
    width: 200,
    padding: theme.spacing(4, 6),
  },
}));

export const HeaderContentFooterBox = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

export const MiddleContentGrid = styled(Grid)(() => ({
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  "& input": {
    padding: "10px",
    fontSize: "smaller",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#575DFB",
      borderRadius: theme.spacing(1),
    },
  },
}));

export const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  border: "1px solid black",
  borderRadius: theme.spacing(1),
  fontSize: "x-small",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
}));
