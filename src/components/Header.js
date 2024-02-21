/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { cacheResults } from "../utils/searchSlice";
import { API_OPTIONS, LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { IoMdArrowDropdown } from "react-icons/io";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { IoIosSearch } from "react-icons/io";
import { IMG_CDN_URL } from "../utils/constants";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useSelector((store) => store.user);
  const user = useSelector((state) => state.user.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const searchCache = useSelector((store) => store.search);
  const initialRender = useRef(true); // useRef to track initial render

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSugsestion();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSugsestion = async () => {
    // const data = await fetch(
    //   `https://suggestqueries.google.com/complete/search?client=firefox&q=${searchQuery}`
    // );

    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchQuery}`,
      API_OPTIONS
    );
    const responce = await data.json();
    setSuggestion(responce);
    dispatch(cacheResults({ [searchQuery]: responce }));
    console.log(responce);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        // Check if it's not the initial render and the user is not on the Browse page
        if (!initialRender.current && window.location.pathname !== "/browse") {
          navigate("/browse");
        }
        // Set initialRender to false after the first render
        initialRender.current = false;
        // dispatch(toggleGptSearchView(false));
      } else {
        dispatch(removeUser());
        // Check if it's not the initial render and the user is not on the Home page
        if (!initialRender.current && window.location.pathname !== "/") {
          navigate("/");
        }
        // Set initialRender to false after the first render
        initialRender.current = false;
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClicked = () => {
    // If GPT Search view is already active, navigate to browse
    // if (showGptSearch) {
    //   navigate("/browse");
    // }
    // dispatch(toggleGptSearchView());
    navigate("/browse");

    dispatch(toggleGptSearchView());
  };

  const handleMovieClick = () => {
    navigate("/explore/movie"); // Navigate regardless of the current path
  };

  const handleTVShowClick = () => {
    navigate("/explore/tv"); // Navigate regardless of the current path
  };

  const handleSearchClicked = (query) => {
    if (query?.length > 0) {
      navigate(`/search/${query}`);
      setShowSuggestion(false);
    }

    setSearchQuery(query);
  };

  const handleSearchBtn = (query) => {
    if (query?.length > 0) {
      navigate(`/search/${query}`);
      setShowSuggestion(false);
    }
  };

  return (
    <div
      className={`absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between`}
    >
      <div className="flex justify-between items-center gap-24">
        <img className="w-56" src={LOGO} alt="logo" />
        {user && (
          <div className="">
            <ul className="text-white flex gap-8 text-lg">
              {showGptSearch ? (
                <li onClick={handleGptSearchClicked}>
                  {" "}
                  <Link to="/browse">Home</Link>
                </li>
              ) : (
                <li>
                  {" "}
                  <Link to="/browse">Home</Link>
                </li>
              )}

              <li className="cursor-pointer" onClick={handleMovieClick}>
                Movies
              </li>

              <li className="cursor-pointer" onClick={handleTVShowClick}>
                TV Shows
              </li>

              <li>Favarite</li>
            </ul>
          </div>
        )}
      </div>
      {user && (
        <>
          <div className="flex p-4 text-center">
            {showGptSearch && (
              <select
                className="px-4 py-2 mx-2 my-2 mb-5 bg-zinc-800 text-white text-sm"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <div className="pt-3">
              <div className="flex h-10 py-4 px-5  bg-slate-700 rounded-2xl items-center shadow-lg w-[410px]">
                <input
                  className=" text-white w-full bg-slate-700 outline-none"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestion(true)}

                  // onBlur={() => setShowSuggestion(false)}
                />
                <IoIosSearch
                  className="font-bold text-2xl text-white cursor-pointer"
                  onClick={() => handleSearchBtn(searchQuery)}
                />
              </div>
            </div>
            <div className="bg-white absolute top-20 min-w-[400px] ml-1.5 ">
              {showSuggestion && (
                <div className="bg-white text-left px-4 text-sm">
                  <ul>
                    {suggestion?.results?.slice(0, 12).map((s) => (
                      <li
                        className="py-1 shadow-sm hover:bg-gray-100 cursor-pointer"
                        key={s.id}
                        onClick={() => handleSearchClicked(s.title || s.name)}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="w-10 h-10 ">
                            {s.poster_path || s.profile_path ? (
                              <img
                                className="w-full h-full object-cover object-center rounded-lg"
                                src={`${IMG_CDN_URL}${
                                  s.poster_path || s.profile_path
                                }`}
                                alt="search-img"
                              />
                            ) : (
                              <IoIosSearch className="text-lg mt-3 ml-3" />
                            )}
                          </div>
                          <div>{s.name || s.title}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {showGptSearch ? (
              ""
            ) : (
              <button
                className="px-4 py-2 mx-2 my-2 mb-5 bg-violet-800 font-semibold text-white "
                onClick={handleGptSearchClicked}
              >
                GPT Search
              </button>
            )}

            <img
              className="w-12 h-12 rounded-lg"
              src={user.photoURL}
              alt="user-icon"
            />
            <ul className="flex items-center space-x-1">
              <li className="relative group ">
                <div className="font-bold text-white text-4xl mb-4 mr-2">
                  <IoMdArrowDropdown />
                </div>
                <ul className="absolute hidden  bg-gray-600 text-white group-hover:block  hover:bg-gray-800">
                  <li className="px-2 py-2">
                    <h1 className=" text-white font-bold text-lg">
                      {user.displayName}
                    </h1>
                    <button
                      onClick={handleSignOut}
                      className="text-center pt-2"
                    >
                      Logout{" "}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
