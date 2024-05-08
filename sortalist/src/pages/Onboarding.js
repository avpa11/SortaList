import { Button, Grid, Link, Typography } from "@mui/material";
import { WhiteCardBox } from "../components/styled";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <WhiteCardBox mb={7}>
        <Grid
          container
          direction={"column"}
          justifyContent="center"
          spacing={2}
        >
          <Grid
            xs={12}
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
            onClick={() => navigate("/")}
          >
            <img
              src="./images/logo.png"
              alt="SortaList Logo"
              style={{ height: "35px" }}
            />
          </Grid>
          <Grid
            xs={12}
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>
          <Grid
            xs={12}
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
            pb={5}
            mb={5}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid
            xs={12}
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={5}
          >
            <Typography>
              Continue as a{" "}
              <Link color={"violet.main"} onClick={() => navigate("/guest")}>
                Guest
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </WhiteCardBox>
    </>
  );
};
export default OnboardingPage;
