import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import ExplorePage from "./ExplorePage";

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
  ]);

  // get navigate from the router

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
