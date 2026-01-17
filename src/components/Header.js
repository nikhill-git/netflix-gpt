import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log(user)
  const dispatch = useDispatch()

  useEffect(() => {
    //this api called when ever user sign in or sign up or sign out (authuntication state change)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //if user sign or sign up, dispatch an action(addUSer)
        const {uid, displayName, email, photoURL} = user;
        dispatch(addUser(
          {
            uid: uid,
            name : displayName,
            email : email,
            photoURL : photoURL
          }
        ))
        navigate("/browse")
      } else {
        // User is signed out dispatch an action (removeUser)
        dispatch(removeUser())
        navigate("/")
      }
    });
//unsubscribe when the componenet unmounts
    return () => unsubscribe()
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };


  return (
    <div className="absolute w-full flex justify-between items-center px-8 py-2 bg-gradient-to-b from-black z-10">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex justify-center items-center gap-3">
          <img 
          height={40}
          width={40}
          className="rounded"
          alt="user img"
          src={user?.photoURL}
           />
          <div>
            <p className="text-white">{user.displayName}</p>
            <button
            onClick={handleSignOut}
            className="h-8 rounded px-2 font-semi-bold text-xl bg-red-900 text-black"
          >
            Sign out
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
