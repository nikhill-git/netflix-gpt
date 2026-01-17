import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { USER_AVATAR } from "../utils/constants";



const Login = () => {
 // to know if user is in sign in or sign up form and change the UI accordingly
 const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //we just need the value of the input boxes, if we use state, it re-render every time
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  function toggleSignInForm() {
    setIsSignUp((prev) => !prev);
  }

  const validateForm = () => {
    const data = {
      name: name.current?.value,
      email: email.current.value,
      password: password.current.value,
    };
    const msg = checkValidData(data);
    setError(msg);

    if (msg) return;

    if (isSignUp) {
      //Sign Up logic
      createUserWithEmailAndPassword(
        //the onauthStateChange is called when ever this api is fetched, 
        // by the time displayName and url is not there, so store is not updated with name and url
        // to reslove this bug we should dispatch an action after displayNAme and url is executed
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          //updating the data with the user name
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR ,
          })
            .then(() => {
              // Profile updated!
              // the user will not have the updated value, auth.CurrentUser will give the updated data
              // console.log("Data without auth", user);
              // console.log("Data with auth", auth.currentUser);
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setError(error);
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " " + errorMessage);
        });
    } else {
      //Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/797df41b-1129-4496-beb3-6fc2f29c59d3/web/IN-en-20260112-TRIFECTA-perspective_004732f9-7464-4a7c-940b-4a51c4f0f73f_small.jpg"
          alt="bg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" rounded bg-black p-9 text-white absolute w-3/12 mt-36 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-3xl p-1 my-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        {/* user name input */}
        {isSignUp && (
          <input
            ref={name}
            type="text"
            placeholder="User name"
            className="text-white outline-none bg-gray-700 p-2 my-4 w-full rounded"
          />
        )}

        {/* Email input */}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="text-white outline-none bg-gray-700 p-2 my-4 w-full rounded"
        />

        {isSignUp ? (
          <p className="text-sm font-semibold">Set Password</p>
        ) : null}

        {/* Password input */}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="text-white outline-none bg-gray-700 p-2 my-4 w-full rounded"
        />
        <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>

        <button
          className="active:scale-90 p-2 text-xl my-4 rounded bg-red-700 w-full"
          onClick={validateForm}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p
          onClick={toggleSignInForm}
          className="cursor-pointer hover:text-blue-500"
        >
          {isSignUp
            ? "Already Signed Up? Sign In now."
            : "New to Netflix? Sign Up now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
