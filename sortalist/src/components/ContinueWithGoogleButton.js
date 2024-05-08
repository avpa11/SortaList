import { SvgIcon, Box } from "@mui/material";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signUpUser } from "../redux/slices/user";
import { auth } from "../firebase/firebase";
import { GoogleButton } from "./styled";

const GoogleIcon = () => {
  return (
    <SvgIcon>
      <path
        fill="#4285F4"
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4815h4.8436c-.2086 1.125-.8427 2.0782-1.7955 2.7164v2.2581h2.9082c1.7014-1.5664 2.6836-3.874 2.6836-6.6151z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9082-2.2581c-.8055.54-1.8364.859-3.0482.859-2.3445 0-4.3282-1.5836-5.0364-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.9641 11.0673c-.1914-.5645-.3009-1.1627-.3009-1.7805s.1095-1.2159.3009-1.7804V4.1745H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523 .3477 2.8264 .9573 4.0045l3.0068-2.9372z"
      />
      <path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077 .4541 3.4409 1.346l2.5813-2.5814C13.4636 .8914 11.4264 0 9 0 5.4818 0 2.4382 2.0168 .9573 4.9955l3.0068 2.9372C5.6718 5.1632 7.6555 3.5795 9 3.5795z"
      />
    </SvgIcon>
  );
};

const ContinueWithGoogleButton = (fullWidth = false) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isformSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const signInWithGoogle = () => {
    var provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        dispatch(
          signUpUser({
            email: user.email,
            uid: user.uid,
            providerId: user.providerId,
            providerData: user.providerData,
          })
        );
        setFormSubmitting(false);
        // redirect the user to the landing authenticated page
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        setFormError("Sorry, something went wrong. Please try again later.");
        console.log(formError);
      });
  };

  return (
    <>
      {isformSubmitting && <Loading />}

      <GoogleButton
        variant="outlined"
        fullWidth={fullWidth === true ? true : false}
        onClick={() => signInWithGoogle()}
        startIcon={
          <Box
            pt={1}
            pb={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <GoogleIcon />
          </Box>
        }
      >
        Continue with Google
      </GoogleButton>
    </>
  );
};

export default ContinueWithGoogleButton;
