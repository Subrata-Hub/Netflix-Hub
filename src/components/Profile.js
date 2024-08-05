import React from "react";

import { Link } from "react-router-dom";

const Profile = ({
  user,
  showSearchBar,
  showProfile,
  profileContainerRef,
  handleProfileClick,
  handleSignOut,
}) => {
  return (
    <>
      {!user ? (
        <div className="button text-white transition-colors font-medium text-lg hover:text-white lg:block ml-0 md:pl-20">
          <Link to={"/login"}>
            {/* <button className="px-6 py-2 bg-pink-700">LogIn</button> */}

            <button
              type="button"
              className={`py-1 px-6  me-2 ${
                showSearchBar ? "hidden" : ""
              } md:flex  text-base font-medium text-gray-900  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
            >
              LogIn
            </button>
          </Link>
        </div>
      ) : (
        <div
          className="relative flex items-center space-x-1 ml-0 md:ml-6"
          ref={profileContainerRef}
        >
          <img
            className={`w-8 h-8 rounded-full ${
              showSearchBar ? "hidden" : ""
            } md:flex`}
            src={user.photoURL}
            alt="user-icon"
            onClick={handleProfileClick}
          />
        </div>
      )}
      {showProfile && user && (
        <div className="absolute mt-36 right-10 px-10 py-2 bg-slate-800 hover:bg-slate-900 text-white">
          <h1 className=" text-white text-[17px] text-center">
            {user.displayName}
          </h1>

          <button
            type="button"
            onClick={handleSignOut}
            class="py-1 px-6 me-2 mt-2  text-base font-medium text-gray-900  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
