import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { TextFieldStyled, WhiteCardBox } from "../components/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FieldWithSeparateLabel from "../components/FieldWithSeparateLabel";
import { validatePassword, isEmailValid } from "../utils/validations";
import { Controller, useForm } from "react-hook-form";
import PasswordTextField from "../components/PasswordField";
import ContinueWithGoogleButton from "../components/ContinueWithGoogleButton";
import Loading from "../components/Loading";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }) => {
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
                Sign Up
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="body2">
                Get started on crafting your game! Sign up now to begin the
                adventure.
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="Email">
                <Controller
                  rules={{
                    required: "Required",
                    validate: (value) => {
                      return isEmailValid(value)
                        ? true
                        : "Please input a valid email address";
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextFieldStyled
                      padding={2}
                      variant="outlined"
                      id="email"
                      inputProps={{
                        "aria-label": "Email",
                      }}
                      {...field}
                      fullWidth
                      placeholder="Ex: abc@example.com"
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="heading3" color="violet.main">
                              @
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="email"
                  control={control}
                  defaultValue={""}
                />
              </FieldWithSeparateLabel>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="Password">
                <Controller
                  rules={{
                    required: "Required",
                    validate: (value) => {
                      const passErrorMsg = validatePassword(value);
                      return passErrorMsg === "" ? true : passErrorMsg;
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <PasswordTextField
                      fieldName="Password"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                    />
                  )}
                  name="password"
                  control={control}
                  defaultValue=""
                />
              </FieldWithSeparateLabel>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="Confirm Password">
                <Controller
                  rules={{
                    required: "Required",
                    validate: (value, formValues) => {
                      return formValues.password === value
                        ? true
                        : "Passwords must match";
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <PasswordTextField
                      fieldName="Confirm Password"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                    />
                  )}
                  name="confirmpassword"
                  control={control}
                  defaultValue=""
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
                Sign Up
              </Button>
            </Grid>
            <Grid xs={12} item my={2}>
              <Divider />
            </Grid>
            <Grid
              xs={12}
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ContinueWithGoogleButton fullWidth={true} />
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
              <Typography variant="body2">
                Already have an account?{" "}
                <Link onClick={() => navigate("/login")} color={"violet.main"}>
                  Login
                </Link>
              </Typography>
            </Grid>
            <Grid
              xs={12}
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={5}
            >
              <Typography variant="body2">
                Continue as a{" "}
                <Link color={"violet.main"} onClick={() => navigate("/guest")}>
                  Guest
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </WhiteCardBox>
    </>
  );
};
export default LoginPage;
