import { Button, Divider, Grid, Typography } from "@mui/material";
import { TextFieldStyled, WhiteCardBox } from "../components/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FieldWithSeparateLabel from "../components/FieldWithSeparateLabel";
import { Controller, useForm } from "react-hook-form";
import Loading from "../components/Loading";

const GuestLoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async ({ sessionId, name }) => {
    console.log("Not implemented yet");
  };

  return (
    <>
      <WhiteCardBox mb={7}>
        {isSubmitting && <Loading />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            spacing={2}
          >
            <Grid xs={12} item onClick={() => navigate("/onboarding")}>
              <ArrowBackIcon />
            </Grid>
            <Grid xs={12} item>
              <Typography variant="h5" color={"violet.main"}>
                Welcome
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="body2">
                Enter your xx-digit Session ID and start playing!
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="Session ID">
                <Controller
                  rules={{
                    required: "Required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextFieldStyled
                      padding={2}
                      variant="outlined"
                      id="sessionId"
                      inputProps={{
                        "aria-label": "Session ID",
                      }}
                      {...field}
                      fullWidth
                      placeholder=""
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                    />
                  )}
                  name="sessionId"
                  control={control}
                  defaultValue={""}
                />
              </FieldWithSeparateLabel>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="Name">
                <Controller
                  rules={{
                    required: "Required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextFieldStyled
                      padding={2}
                      variant="outlined"
                      id="name"
                      inputProps={{
                        "aria-label": "Session ID",
                      }}
                      {...field}
                      fullWidth
                      placeholder=""
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                    />
                  )}
                  name="name"
                  control={control}
                  defaultValue={""}
                />
              </FieldWithSeparateLabel>
            </Grid>
            <Grid
              xs={12}
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button fullWidth variant="contained" color="primary">
                Play
              </Button>
            </Grid>
            <Grid xs={12} item mt={2} mb={5} pb={5}>
              <Divider />
            </Grid>
          </Grid>
        </form>
      </WhiteCardBox>
    </>
  );
};
export default GuestLoginPage;
