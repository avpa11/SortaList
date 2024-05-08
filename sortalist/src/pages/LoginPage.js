import {
  Alert,
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
import { auth } from "../firebase/firebase";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signUpUser } from "../redux/slices/user";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSucess] = useState(null);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // successfully logged in
        const user = userCredential.user;
        if (user.emailVerified === true) {
          // we store the data in redux store
          dispatch(
            signUpUser({
              email: user.email,
              uid: user.uid,
              providerId: user.providerId,
            })
          );

          // redirect the user to the landing authenticated page
          navigate("/dashboard", { replace: true });
        } else {
          sendEmailVerification(user).then(() => {
            setFormSucess(
              "We have sent you sent you a link to your email. Please verify your account and log in again"
            );
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (
          errorMessage === "Firebase: Error (auth/wrong-password)." ||
          errorMessage === "Firebase: Error (auth/user-not-found)."
        ) {
          setFormError("Incorrect email or password");
        } else {
          setFormError(
            "Sorry, something went wrong. Please try again or contact us if the issue persists"
          );
        }
      });
  };

  return (
    <>
      <WhiteCardBox mb={7}>
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
            {isSubmitting && <Loading />}
            {formError && <Alert severity="error">{formError}</Alert>}
            {formSuccess && <Alert severity="success">{formSuccess}</Alert>}
            <Grid xs={12} item>
              <Typography variant="h5" color={"violet.main"}>
                Login
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="body2">
                Get started on crafting your game! Log in now to begin the
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
              <FieldWithSeparateLabel label="Your Password">
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
            <Grid
              xs={12}
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
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
                Don't have an account?{" "}
                <Link
                  onClick={() => navigate("/sign-up")}
                  color={"violet.main"}
                >
                  Register
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
