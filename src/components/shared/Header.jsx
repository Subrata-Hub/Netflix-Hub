/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { cacheResults } from "../../utils/searchSlice";
import { API_OPTIONS, SUPPORTED_LANGUAGES } from "../../utils/constants";
import LOGO from "../../assets/logo.png";
import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { toggleGptSearchView } from "../../utils/gptSlice";
import { changeLanguage } from "../../utils/configSlice";
import MobileNavigation from "./MobileNavigation";
import useOutsideClick from "../../hooks/useOutsideClick";
import Profile from "../Profile";
import SearchSuggestion from "../SearchSuggestion";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const searchCache = useSelector((store) => store.search);
  const initialRender = useRef(true);
  const profileContainerRef = useRef(null);
  const searchBarContainerRef = useRef(null);

  useOutsideClick(profileContainerRef, () => setShowProfile(false));
  useOutsideClick(searchBarContainerRef, () => {
    setShowSuggestion(!showSuggestion);
    setSuggestion([]);
  });

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
  }, []);

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

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-b-slate-800 md:border-b-slate-900 md:backdrop-blur-xs">
      <div className={`flex items-center px-2 lg:px-7.5 xl:px-10 max-lg:py-4`}>
        <Link
          to="/"
          className={`w-[12rem] xl:mr-8 ${
            showSearchBar ? "hidden" : "block"
          }  md:flex`}
          onClick={handleClick}
        >
          <img src={LOGO} alt="logo" width={190} height={40} />
        </Link>

        {!showGptSearch && (
          <div className="hidden md:flex md:h-9 h-0 px-5 bg-slate-800 rounded-2xl items-center shadow-lg w-screen overflow-x-auto md:w-[500px]">
            <input
              className="text-white w-full bg-slate-800 outline-hidden"
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

        {/* for mobile searchbar */}
        <div
          className={`${
            showSearchBar ? "flex" : "hidden"
          } md:hidden h-9 px-2 bg-slate-800 rounded-xl items-center shadow-lg w-screen min-h-12  z-50`}
        >
          <input
            className="text-white w-full bg-slate-800 outline-hidden"
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

        {/* SearchSuggestion   */}

        <SearchSuggestion
          searchBarContainerRef={searchBarContainerRef}
          showSuggestion={showSuggestion}
          suggestion={suggestion}
          handleSearchSeggestion={handleSearchSeggestion}
          handleSearchClicked={handleSearchClicked}
        />

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
                className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 md:py-6 py-4 lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                onClick={handleClick}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 md:py-6 py-4 lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                onClick={handleMovieClick}
              >
                Movies
              </li>
              <li
                className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 md:py-6 py-4  lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
                onClick={handleTVShowClick}
              >
                TV Shows
              </li>
              {user && (
                <li
                  className="font-code text-2xl uppercase cursor-pointer text-white transition-colors hover:text-purple-400 px-6 md:py-6 py-4  lg:text-xs lg:font-semibold lg:leading-4 lg:hover:text-white md:px-1"
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
          {/* profile Section */}
          <Profile
            user={user}
            showSearchBar={showSearchBar}
            profileContainerRef={profileContainerRef}
            handleProfileClick={handleProfileClick}
            showProfile={showProfile}
            handleSignOut={handleSignOut}
          />
        </>
      </div>

      {/* Mobile Navigation */}

      <MobileNavigation
        handleClick={handleClick}
        openNavigation={openNavigation}
        handleMovieClick={handleMovieClick}
        handleTVShowClick={handleTVShowClick}
        handleGptSearchClicked={handleGptSearchClicked}
        toggleNavigation={toggleNavigation}
      />
    </div>
  );
};

export default Header;
