import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    //this api called when ever user sign in or sign up or sign out (authuntication state change)
    onAuthStateChanged(auth, (user) => {
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
      } else {
        // User is signed out dispatch an action (removeUser)
        dispatch(removeUser())
      }
    });
  }, []);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
