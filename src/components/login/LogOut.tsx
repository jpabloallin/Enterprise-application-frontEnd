import { useDispatch } from "react-redux";
import { logOutReducer } from "../../features/loggedInSlice"
import { useNavigate } from "react-router-dom";
import { auth } from './firebaseConfig'
import { signOut  } from 'firebase/auth'

const LogOut: React.FunctionComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutButton = () => {
      dispatch(logOutReducer())
      navigate('/login')
  }

  return (
    <div>
        <br />
        <h3>¿De verdad quieres cerrar la sesión?</h3><br />
        <button className="btn btn-danger mb-4 btn-outline-dark btn-lg" onClick={logOutButton}>Log Out</button>
        <br /><br />
    </div>
  );
};

export default LogOut;