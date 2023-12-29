import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  // return (
  //   <div className="px-6">
  //     <h1 className="text-3xl py-6 text-white">{title}</h1>
  //     <div className="flex overflow-hidden hover:overflow-x-scroll">
  //       <div className="flex">
  //         {movies.map((movie) => (
  //           <React.Fragment key={movie.id}>
  //             <MovieCard
  //               posterPath={movie.poster_path}
  //               key={movie.id}
  //               setIsShow={setIsShow}
  //             />
  //             {isShow && (
  //               <HoverMovieCard
  //                 title={movie.original_title}
  //                 backImg={movie.backdrop_path}
  //                 genreIds={movie.genre_ids}
  //                 key={`hover-${movie.id}`}
  //               />
  //             )}
  //           </React.Fragment>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="px-6 py-3">
      <h1 className="text-3xl py-3 text-white">{title}</h1>
      <div className="flex overflow-hidden hover:overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              posterPath={movie.poster_path}
              key={movie.id}
              title={movie.original_title}
              backImg={movie.backdrop_path}
              genreIds={movie.genre_ids}
              cardMovieId={movie.id}
              overView={movie.overview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
