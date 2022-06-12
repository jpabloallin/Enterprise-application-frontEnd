import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebaseConfig";


const LogIn: React.FunctionComponent = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const logInForm = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if(userName && password){
      signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        // Logged in
        //If the logged in is succesfull you will acces this part of teh code where you will 
        //get a lot of information about the user that have logged in
        const user = userCredential.user;

        console.log('**** user credentials ****');
        console.log(userCredential);
        console.log('**** user ***');
        console.log(user)
        
        /*Whit the information of the user you can populate an state that is mainly focused on 
        holding the information of the user that is logged in*/
        // ...
      })
      .catch((error) => {

        //If the logged in is not succesfull yu will get to this part and with the message you can tell 
        //the user what went wrong
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('*** Log in error ***');
        console.log(errorMessage);
      });

      setPassword('')
      setUserName('')
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <br />
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="email"
          name="email"
          value={userName}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          value={password}
        />
        <br />
        <button onClick={(e) => logInForm(e)}>Log In</button>
        <br />
      </form>
    </div>
  );
};

export default LogIn;