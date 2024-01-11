// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { signOut } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useSelector } from "react-redux";
// import { addUser, removeUser } from "../utils/userSlice";
// import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { toggleGptSearchView } from "../utils/gptSlice";
// import { changeLanguage } from "../utils/configSlice";
// import GptSearch from "./GptSearch";

// const Header = () => {
//   const [shouldNavigate, setShouldNavigate] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);
//   const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {
//         // An error happened.
//         navigate("/error");
//       });
//   };

//   const handleGptSearchClicked = () => {
//     dispatch(toggleGptSearchView());
//   };

//   const handleLanguageChange = (e) => {
//     dispatch(changeLanguage(e.target.value));
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const { uid, email, displayName, photoURL } = user;
//         dispatch(
//           addUser({
//             uid: uid,
//             email: email,
//             displayName: displayName,
//             photoURL: photoURL,
//           })
//         );

//         // Check if the user is not on the Browse page and the component hasn't navigated yet
//         if (window.location.pathname !== "/browse") {
//           navigate("/browse");
//         }
//       } else {
//         dispatch(removeUser());
//         // Check if the user is not on the Home page and the component hasn't navigated yet
//         if (window.location.pathname !== "/") {
//           navigate("/");
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch, navigate]);

//   const handleMovieClick = () => {
//     navigate("/explore/movie"); // Navigate regardless of the current path
//   };

//   const handleTVShowClick = () => {
//     navigate("/explore/tv"); // Navigate regardless of the current path
//   };
//   return (
//     <div
//       className={`absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between`}
//     >
//       <div className="flex justify-between items-center gap-24">
//         <img className="w-56" src={LOGO} alt="logo" />

//         {user && (
//           <div className="">
//             <ul className="text-white flex gap-8 text-lg">
//               {showGptSearch && (
//                 <li onClick={handleGptSearchClicked}>
//                   {" "}
//                   <Link to="/browse">Home</Link>
//                 </li>
//               )}
//               <li className="cursor-pointer" onClick={handleMovieClick}>
//                 Movies
//               </li>

//               <li className="cursor-pointer" onClick={handleTVShowClick}>
//                 TV Shows
//               </li>

//               <li>Favarite</li>
//             </ul>
//           </div>
//         )}
//       </div>
//       {user && (
//         <div className="flex p-4 text-center">
//           {showGptSearch && (
//             <select
//               className="px-4 py-2 mx-2 my-2 mb-5 bg-zinc-800 text-white text-sm"
//               onChange={handleLanguageChange}
//             >
//               {SUPPORTED_LANGUAGES.map((lang) => (
//                 <option key={lang.identifier} value={lang.identifier}>
//                   {lang.name}
//                 </option>
//               ))}
//             </select>
//           )}
//           {showGptSearch ? (
//             ""
//           ) : (
//             <button
//               className="px-4 py-2 mx-2 my-2 mb-5 bg-violet-800 font-semibold text-white "
//               onClick={handleGptSearchClicked}
//             >
//               GPT Search
//             </button>
//           )}
//           <h1 className="py-2 px-4  text-white font-bold text-lg">
//             {user.displayName}
//           </h1>
//           <img
//             className="w-12 h-12 rounded-lg"
//             src={user.photoURL}
//             alt="user-icon"
//           />

//           <ul className="flex items-center space-x-1">
//             <li className="relative group ">
//               <div className="font-bold text-white text-4xl mb-4 mr-2">
//                 <IoMdArrowDropdown />
//               </div>

//               <ul className="absolute hidden  bg-gray-600 text-white group-hover:block  hover:bg-gray-800">
//                 <li className="px-2 py-2">
//                   <button onClick={handleSignOut} className="text-center">
//                     Logout{" "}
//                   </button>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;
