import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Navigate to="/Main" replace={true} />,
  },
  {
    path: "/Main",
    element: <Header />,
    children: [
      // { index: true, element: < /> },
      // { path: "", element: < /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
