import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
// import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
import useTrending from "../hooks/useTrending";
import Baner from "./Baner";
import useTrendingShow from "../hooks/useTrendingShow";
import useFavourites from "../hooks/useFavourites";
import useIndianMovies from "../hooks/useIndianMovies";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useTrending();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useFavourites();
  useIndianMovies();

  useTrendingShow();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          {/* <MainContainer /> */}
          <Baner />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
