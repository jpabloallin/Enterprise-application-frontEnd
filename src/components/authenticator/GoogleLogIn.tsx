import { signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig"
import { logInReducer } from "../../features/loggedInSlice"
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Container } from "@mantine/core";


const GoogleLogIn: React.FunctionComponent = () => {

  const providerGoogleAuth = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signInWithGoogleButton = () => {

    signInWithPopup(auth, providerGoogleAuth)
    .then((result) => {
      const credential:OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;

      dispatch(logInReducer(user))
      navigate('/main')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  return (
    <Container className="classes.center">
      <Button className="classes.button" onClick={signInWithGoogleButton}>
        <Avatar src={"https://freepngimg.com/thumb/google/66912-logo-now-google-plus-search-free-transparent-image-hd.png"} className="classes.avatar" />
          Sign in with Google
      </Button>
    </Container>
  );
};

export default GoogleLogIn;