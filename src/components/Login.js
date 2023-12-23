import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInFrom, setIsSignInFrom] = useState(true);

  const toggleSignInFrom = () => {
    setIsSignInFrom(!isSignInFrom);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg-img"
        />
      </div>

      <form className="p-14 bg-black absolute my-28 mx-auto right-0 left-0 w-[29%] text-white rounded-sm bg-opacity-85">
        <h1 className="font-bold text-3xl pb-5">
          {isSignInFrom ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInFrom && (
          <input
            type="text"
            placeholder=" Full Name"
            className="p-3 my-2 w-full bg-neutral-700 rounded-sm"
          />
        )}
        <input
          type="text"
          placeholder=" Email Address"
          className="p-3 my-2 w-full bg-neutral-700 rounded-sm"
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 my-2 w-full bg-neutral-700 rounded-sm"
        />
        <button className="p-3 my-8 bg-red-700 w-full rounded-sm">
          {isSignInFrom ? "Sign In" : "Sign Up"}
        </button>
        <div className="py-6">
          {isSignInFrom ? (
            <p>
              <span className="text-zinc-400">New to Netflix?</span>
              <span className="cursor-pointer" onClick={toggleSignInFrom}>
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              <span className="text-zinc-400">Already registered? </span>
              <span className="cursor-pointer" onClick={toggleSignInFrom}>
                Sign In Now
              </span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
