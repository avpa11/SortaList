import { Button, Divider, Grid, Typography } from "@mui/material";
import { TextFieldStyled, WhiteCardBox } from "../components/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FieldWithSeparateLabel from "../components/FieldWithSeparateLabel";
import { Controller, useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { auth } from "../firebase/firebase";
import { firestore } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const AboutYouPage = () => {
  const navigate = useNavigate();

  const updateUserProfile = async ({ firstName, lastName, isFirstTimeLogin }) => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User not signed in");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      });

      // Add a new document in collection "UserProfiles"
      const userRef = user.uid;
      await setDoc(doc(db, "UserProfiles", userRef), {
        firstName: "Los Angeles",
        lastName: "CA",
        isFirstTimeLogin: "USA"
      });
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async ({ firstName, lastName }) => {
    // Update user profile in Firebase
    await updateUserProfile({
      firstName,
      lastName,
      isFirstTimeLogin: false, // Set isFirstTimeLogin to false
    });
    //Navigate to the dashboard
    navigate("/dashboard", { replace: true });
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
            <Grid xs={12} item onClick={() => navigate("/login")}>
              <ArrowBackIcon />
            </Grid>
            <Grid xs={12} item>
              <Typography variant="h5" color={"violet.main"}>
                Tell Us About Yourself
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="body2">
                Almost there! Enter your First Name and Last Name to begin the adventure!
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="First Name">
                <Controller
                  rules={{
                    required: "Required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextFieldStyled
                      padding={2}
                      variant="outlined"
                      id="firstName"
                      inputProps={{
                        "aria-label": "First Name",
                        placeholder: "e.g., John",
                        sx: {
                          "&::placeholder": {
                            color: "#C8C8C8",
                          },
                        }
                      }}
                      {...field}
                      fullWidth
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                    />
                  )}
                  name="firstName"
                  control={control}
                  defaultValue={""}
                />
              </FieldWithSeparateLabel>
            </Grid>
            <Grid xs={12} item>
              <FieldWithSeparateLabel label="Last Name">
                <Controller
                  rules={{
                    required: "Required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextFieldStyled
                      padding={2}
                      variant="outlined"
                      id="lastName"
                      inputProps={{
                        "aria-label": "Last Name",placeholder: "e.g., John",
                        sx: {
                          "&::placeholder": {
                            color: "#C8C8C8",
                          },
                        }
                      }}
                      {...field}
                      fullWidth
                      placeholder=""
                      error={!!error}
                      helperText={!!error ? error.message : undefined}
                    />
                  )}
                  name="lastName"
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
              <Button type="submit" fullWidth variant="contained" color="primary">
                Continue
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
export default AboutYouPage;
