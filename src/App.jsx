import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Landing_page from "./landingpage/landing_page";
import SigninContainer from "./containers/SigninContainer";
import LoginContainer from "./containers/LoginContainer";
import ProtectedRouter from "./routes/ProtectedRouter";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing_page /> },
      { path: "/signin", element: <SigninContainer /> },
      { path: "/login", element: <LoginContainer /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRouter>
            <Dashboard />
          </ProtectedRouter>
        ),
      },
      {
        path: "/project/:id",
        element: (
          <ProtectedRouter>
            <ProjectPage />
          </ProtectedRouter>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
