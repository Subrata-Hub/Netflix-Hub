import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import ExplorePage from "./ExplorePage";
import DetailsPage from "./DetailsPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/explore/:mediaType",
      element: <ExplorePage />,
    },
    {
      path: "/:mediaType/:id",
      element: <DetailsPage />,
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
