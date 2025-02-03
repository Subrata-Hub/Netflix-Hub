import Header from "../shared/Header";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";

import SecondaryContainer from "../SecondaryContainer";
import usePopularMovies from "../../hooks/usePopularMovies";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useTrending from "../../hooks/useTrending";
import Baner from "../Baner";
import useTrendingShow from "../../hooks/useTrendingShow";
import useFavourites from "../../hooks/useFavourites";
import useIndianMovies from "../../hooks/useIndianMovies";

const Browse = () => {
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

      <>
        <Baner />
        <SecondaryContainer />
      </>
    </div>
  );
};

export default Browse;
