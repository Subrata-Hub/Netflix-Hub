import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import ExplorePage from "./ExplorePage";
import DetailsPage from "./DetailsPage";

import SearchResultsPage from "./SearchResultsPage";
import GptSearchPage from "./GptSearchPage";

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
  ]);

  // get navigate from the router

  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
