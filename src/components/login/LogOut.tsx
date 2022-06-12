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
      <button onClick={logOutButton}>Log Out</button>
    </div>
  );
};

export default LogOut;