import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import {
  LoginPage,
  ErrorPage,
  SignUpPage,
  HomePage
} from './pages';
import {getToken, setToken} from "./helpers";

import './App.css';

const App = () => {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false)
    }
  }, []);

  const unauthorizedRouter = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUpPage setAuthorized={setAuthorized}/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/*",
      element: <LoginPage setAuthorized={setAuthorized} />,
      errorElement: <ErrorPage />
    },
  ]);

  const authorizedRouter = createBrowserRouter([
    {
      path: "/*",
      element: <HomePage />
    }
  ]);

  return (
      <RouterProvider router={isAuthorized ? authorizedRouter : unauthorizedRouter} />
  );
}

export default App;
