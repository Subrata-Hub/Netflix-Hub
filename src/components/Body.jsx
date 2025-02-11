import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import SearchResultsPage from "./pages/SearchResultsPage";

import Error from "./Error";
import FallbackSpinner from "./shared/FallbackSpinner";

import WatchList from "./pages/WatchList";

const DetailsPage = lazy(() => import("./pages/DetailsPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const GptSearchPage = lazy(() => import("./pages/GptSearchPage"));

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Browse />,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/explore/:mediaType",
      element: (
        <Suspense fallback={<FallbackSpinner />}>
          <ExplorePage />
        </Suspense>
      ),
    },
    {
      path: "/:mediaType/:id",
      element: (
        <Suspense fallback={<FallbackSpinner />}>
          <DetailsPage />
        </Suspense>
      ),
    },
    {
      path: "/search/:query",
      element: <SearchResultsPage />,
    },
    {
      path: "/gptsearch",
      element: (
        <Suspense fallback={<FallbackSpinner />}>
          <GptSearchPage />
        </Suspense>
      ),
    },
    {
      path: "/watchlist",
      element: <WatchList />,
    },
  ]);

  // get navigate from the router

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
