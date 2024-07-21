import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import SearchResultsPage from "./pages/SearchResultsPage";
import GptSearchPage from "./pages/GptSearchPage";

import ExplorePage from "./pages/ExplorePage";
import DetailsPage from "./pages/DetailsPage";
import WatchList from "./pages/WatchList";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Browse />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/explore/:mediaType",
      element: <ExplorePage />,
    },
    {
      path: "/:mediaType/:id",
      element: <DetailsPage />,
    },
    {
      path: "/search/:query",
      element: <SearchResultsPage />,
    },
    {
      path: "/gptsearch",
      element: <GptSearchPage />,
    },
    {
      path: "/watchlist",
      element: <WatchList />,
    },
  ]);

  // get navigate from the router

  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
