import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  function toggleSignInForm() {
    setIsSignUp((prev) => !prev);
  }
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
      onSubmit={(e)=> e.preventDefault()}
      className=" rounded bg-black p-9 text-white absolute w-3/12 mt-36 mx-auto right-0 left-0 bg-opacity-80">
        <h1 className="font-bold text-3xl p-1 my-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        {isSignUp && (
          <input
            type="text"
            placeholder="User name"
            className="text-white outline-none bg-gray-700 p-2 my-4 w-full rounded"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="text-white outline-none bg-gray-700 p-2 my-4 w-full rounded"
        />
        {isSignUp ? (
          <p className="text-sm font-semibold">Set Password</p>
        ) : null}

        <input
          type="password"
          placeholder="Password"
          className="text-white outline-none bg-gray-700 p-2 my-4 w-full rounded"
        />

        <button className="p-2 text-xl my-4 rounded bg-red-700 w-full">
          {isSignUp ? (
            <span onClick={() => setIsSignUp(!isSignUp)}>Sign Up</span>
          ) : (
            <span>Sign In</span>
          )}
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
