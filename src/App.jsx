import React from "react";
import Landing_page from "./landingpage/landing_page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Landing_page /> },
        {
          path: "/login",
          element: <div>Login Page</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
