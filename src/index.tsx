import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Category from "./routes/Category";
import Restaurant from "./routes/Restaurant";
import Confirmation from "./routes/Confirmation";
import Dish from "./routes/Dish";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// router path
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/restaurant",
    element: <Restaurant />,
  },
  {
    path: "/dish",
    element: <Dish />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <main className="min-h-screen flex flex-col justify-center items-center">
    <h1 className="my-3">CTW Food App</h1>
    <RouterProvider router={router} />
  </main>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
