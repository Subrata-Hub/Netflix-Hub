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
import { API_OPTIONS, SUPPORTED_LANGUAGES } from "../utils/constants";
import LOGO from "../assets/logo.png";
import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { IMG_CDN_URL3 } from "../utils/constants";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const searchCache = useSelector((store) => store.search);
  const initialRender = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchQuery}`,
      API_OPTIONS
    );
    const response = await data.json();
    setSuggestion(response);
    dispatch(cacheResults({ [searchQuery]: response }));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
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

        if (!initialRender.current && window.location.pathname !== "/") {
          navigate("/");
        }
        initialRender.current = false;
      } else {
        dispatch(removeUser());
        if (!initialRender.current && window.location.pathname !== "/") {
          navigate("/");
        }
        initialRender.current = false;
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClicked = () => {
    navigate("/gptsearch");
    dispatch(toggleGptSearchView());
  };

  const handleMovieClick = () => {
    navigate("/explore/movie");
    setOpenNavigation(false);
    if (showGptSearch) {
      dispatch(toggleGptSearchView(false));
    }
  };

  const handleTVShowClick = () => {
    navigate("/explore/tv");
    setOpenNavigation(false);
    if (showGptSearch) {
      dispatch(toggleGptSearchView(false));
    }
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

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleSearchSeggestion = () => {
    setShowSuggestion(!showSuggestion);
  };

  const handleClick = () => {
    if (showGptSearch) {
      dispatch(toggleGptSearchView(false));
    }
    if (!openNavigation) return;

    setOpenNavigation(false);
  };

  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    // SetDesktopMenu(false);
    setShowSuggestion(false);
  };

  const gptSearchButton = user && (
    <button
      className="px-3 py-1 mx-2 my-1 mb-2 bg-violet-800 text-sm font-semibold text-white ml-0 md:ml-20 hidden md:flex"
      onClick={handleGptSearchClicked}
    >
      GPT Search
    </button>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-b-slate-800 lg:border-b-slate-900 lg:backdrop-blur-sm">
      <div className={`flex items-center px-2 lg:px-7.5 xl:px-10 max-lg:py-4`}>
        <Link
          to="/"
          className={`block w-[12rem] xl:mr-8 ${
            showSearchBar ? "hidden" : ""
          } md:flex`}
        >
          <img src={LOGO} alt="logo" width={190} height={40} />
        </Link>

        {!showGptSearch && (
          <div className="hidden md:flex h-9 px-5 bg-slate-800 rounded-2xl items-center shadow-lg w-screen overflow-x-auto md:w-[500px]">
            <input
              className="text-white w-full bg-slate-800 outline-none"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
            />
            <IoIosSearch
              className="font-bold text-2xl text-white cursor-pointer ml-2"
              onClick={() => handleSearchBtn(searchQuery)}
            />
            <IoMdClose
              className="font-bold text-2xl text-white cursor-pointer ml-2 md:hidden"
              onClick={handleShowSearchBar}
            />
          </div>
        )}
        <div
          className={`${
            showSearchBar ? "flex" : "hidden"
          } md:hidden h-9 px-2 bg-slate-800 rounded-xl items-center shadow-lg w-screen min-h-12  z-50`}
        >
          <input
            className="text-white w-full bg-slate-800 outline-none"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
          />
          <IoIosSearch
            className="font-bold text-2xl text-white cursor-pointer ml-2"
            onClick={() => handleSearchBtn(searchQuery)}
          />
          <IoMdClose
            className="font-bold text-2xl text-white cursor-pointer ml-2 md:hidden"
            onClick={handleShowSearchBar}
          />
        </div>

        <div className="bg-slate-950 absolute top-20 min-w-[380px] md:min-w-[500px] ml-1.5 lg:ml-56 lg:top-14 z-50 ">
          {showSuggestion && (
            <div className="bg-slate-950 text-left px-4 text-sm text-white">
              <ul>
                {suggestion?.results?.slice(0, 12).map((s) => (
                  <li
                    className="py-1 shadow-sm hover:bg-slate-900 cursor-pointer"
                    key={s.id}
                    onClick={() => handleSearchClicked(s.title || s.name)}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 ">
                        {s.poster_path || s.profile_path ? (
                          <img
                            className="w-full h-full object-cover object-center rounded-lg"
                            src={`${IMG_CDN_URL3}${
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
          {showSuggestion && suggestion?.results.length > 0 && (
            <IoMdClose
              className="text-white text-2xl hidden md:absolute top-5 right-5"
              onClick={handleSearchSeggestion}
            />
          )}
        </div>

        <>
          {!showGptSearch && (
            <IoIosSearch
              className={`text-white text-2xl ${
                showSearchBar ? "hidden" : ""
              } md:hidden ml-12 `}
              onClick={handleShowSearchBar}
            />
          )}

          <nav className={`hidden lg:flex lg:ml-auto`}>
            <ul className="flex gap-6 text-lg">
              <li
                className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 py-6 lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                onClick={handleClick}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 py-6 lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                onClick={handleMovieClick}
              >
                Movies
              </li>
              <li
                className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 py-6 lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                onClick={handleTVShowClick}
              >
                TV Shows
              </li>
              {user && (
                <li
                  className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 py-6 lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                  onClick={handleClick}
                >
                  <Link to="/watchlist">WatchList</Link>
                </li>
              )}
            </ul>
          </nav>

          {showGptSearch ? (
            <select
              className="px-3 py-1 mx-2 my-1 mb-2 bg-zinc-800 text-white text-sm"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          ) : (
            gptSearchButton
          )}

          <IoMdMenu
            className={`${
              showSearchBar ? "hidden" : ""
            } ml-auto md:hidden lg:hidden text-white text-2xl m-3 `}
            onClick={toggleNavigation}
          />
          {!user ? (
            <div className="button   text-white transition-colors hover:text-white lg:block ml-0 md:pl-20">
              <Link to={"/login"}>Login</Link>
            </div>
          ) : (
            <ul className="flex items-center space-x-1">
              <li className="relative group ml-0 md:ml-6 ">
                <img
                  className={`w-8 h-8 rounded-full ${
                    showSearchBar ? "hidden" : ""
                  } md:flex`}
                  src={user.photoURL}
                  alt="user-icon"
                />
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
          )}
        </>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`lg:hidden fixed top-0 left-0 w-full h-full ${
          openNavigation ? "block" : "hidden"
        } bg-slate-950 z-50`}
      >
        <div className="flex flex-col items-center justify-center m-auto">
          <ul className="text-white flex flex-col gap-4 text-lg mt-16">
            <li
              className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
              onClick={handleClick}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
              onClick={handleMovieClick}
            >
              Movies
            </li>
            <li
              className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
              onClick={handleTVShowClick}
            >
              TV Shows
            </li>
            <li
              className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
              onClick={handleClick}
            >
              <Link to="/watchlist">WatchList</Link>
            </li>
            <li
              className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
              onClick={handleClick}
            >
              <button
                className="px-3 py-1 mx-2 my-1 mb-2 bg-violet-800 font-semibold text-white ml-0 md:ml-20 "
                onClick={handleGptSearchClicked}
              >
                GPT Search
              </button>
            </li>
          </ul>
          <IoMdClose
            className="text-white text-2xl md:hidden absolute top-5 right-5"
            onClick={toggleNavigation}
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
