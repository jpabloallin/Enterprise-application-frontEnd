import LogIn from "./LogIn";
import SignIn from "./SignIn";

const AuthenticatorPage = () => {

  return (
    <div className="d-flex justify-content-around">
      <div className="p-5">
        <SignIn/>
      </div>
      <div className="p-5">
        <LogIn/>
      </div>
    </div>
  );
};

export default AuthenticatorPage;