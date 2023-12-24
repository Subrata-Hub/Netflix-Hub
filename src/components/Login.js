import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInFrom, setIsSignInFrom] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    console.log(message);
    setErrorMsg(message);
    if (message) return;

    if (!isSignInFrom) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/116452735?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };

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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-14 bg-black absolute my-28 mx-auto right-0 left-0 w-[29%] text-white rounded-sm bg-opacity-85"
      >
        <h1 className="font-bold text-3xl pb-5">
          {isSignInFrom ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInFrom && (
          <input
            ref={name}
            type="text"
            placeholder=" Full Name"
            className="p-3 my-2 w-full bg-neutral-700 rounded-sm"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder=" Email Address"
          className="p-3 my-2 w-full bg-neutral-700 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-3 my-2 w-full bg-neutral-700 rounded-sm"
        />
        <p className="text-red-500 font-bold text-base pt-1">{errorMsg}</p>
        <button
          className="p-3 my-6 bg-red-700 w-full rounded-sm"
          onClick={handleButtonClick}
        >
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
