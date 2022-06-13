import { signInWithPopup, OAuthCredential, GithubAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig"
import { useNavigate } from "react-router-dom";
import { logInReducer } from "../../features/loggedInSlice";
import { Avatar, Button, Container } from "@mantine/core";

const GitHubLogIn: React.FunctionComponent = () => {
  const providerGitHub = new GithubAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGitHubButton = () => {

    signInWithPopup(auth, providerGitHub)
    .then((result) => {
      const credential:OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;

      const user = result.user;
      console.log('user', user)

      dispatch(logInReducer(user))
      navigate('/main')

    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
  }

  return (
    <Container className="classes.center">
    <Button className="classes.button" onClick={signInWithGitHubButton}>
      <Avatar src={"https://iconape.com/wp-content/files/gp/351586/png/github-mark-logo.png"} className="classes.avatar" />
      Sign in with GitHub
    </Button>
  </Container>
  );
};

export default GitHubLogIn;