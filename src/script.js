import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "../components/Header";
import { Body } from "../components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "../components/About";
import Contact from "../components/Contact";
import Error from "../components/Error";
import RestaurantMenu from "../components/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Cart from "../components/Cart";

const AppLayout = () => {
  return (
    // providing store to the react app
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
