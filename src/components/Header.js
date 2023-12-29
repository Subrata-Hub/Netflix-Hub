import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties

        const { uid, email, displayName, photoURL } = user;
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
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmount
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <div className="flex justify-between items-center gap-24">
        <img className="w-56" src={LOGO} alt="logo" />

        {user && (
          <div className="">
            <ul className="text-white flex gap-8 text-lg">
              <li>Movies </li>
              <li>TV Shows </li>
              <li>Favarite</li>
            </ul>
          </div>
        )}
      </div>
      {user && (
        <div className="flex p-4 text-center">
          <button className="px-4 py-2 mx-2 my-2 mb-5 bg-violet-800 font-semibold text-white ">
            GPT Search
          </button>
          <h1 className="py-2 px-4  text-white font-bold text-lg">
            {user.displayName}
          </h1>
          <img
            className="w-12 h-12 rounded-lg"
            src={user.photoURL}
            alt="user-icon"
          />
          {/* <div className="p-2 text-white font-bold">
            {" "}
            <button onClick={handleSignOut} className="">
              (Sign Out)
            </button>
          </div> */}
          <ul className="flex items-center space-x-1">
            <li className="relative group ">
              <div className="font-bold text-white text-4xl mb-4 mr-2">
                <IoMdArrowDropdown />
              </div>

              <ul className="absolute hidden  bg-gray-600 text-white group-hover:block  hover:bg-gray-800">
                <li className="px-2 py-2">
                  <button onClick={handleSignOut} className="text-center">
                    Logout{" "}
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
