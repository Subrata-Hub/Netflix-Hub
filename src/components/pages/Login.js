import { useState, useRef } from "react";
import { toast } from "react-toastify";

// import Header from "../distribute/Header";
import { checkValidateData } from "../../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { BACKGROUND_IMG, USER_AVATAR } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInFrom, setIsSignInFrom] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );

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
            photoURL: USER_AVATAR,
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

              toast.success("Successfully Signed Up");
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });

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
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL || USER_AVATAR,
            })
          );
          toast.success("Successfully Signed In");
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
      {/* <Header /> */}
      {user && navigate("/")}

      <div className="absolute h-full w-full">
        <img
          src={BACKGROUND_IMG}
          className="w-full h-full object-cover object-center"
          alt="bg-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-14 bg-black absolute my-28  mx-auto right-0 left-0 w-full md:w-[29%] text-white rounded-sm bg-opacity-85"
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
