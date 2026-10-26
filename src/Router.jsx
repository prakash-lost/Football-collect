import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AboutUsPage from "./pages/Aboutuspage";      // FIXED: lowercase 'uspage'
import ContactUsPage from "./pages/Contactuspage";  // FIXED: lowercase 'uspage'
import AuthLayout from "./Authlayout";              // FIXED: lowercase 'layout'
import LoginPage from "./pages/LoginForm";
import RegisterPage from "./pages/Registerpage";    // FIXED: lowercase 'page'
import Profile from "./pages/Profile";
import Players from "./pages/Players";
import LoginForm from "./pages/LoginForm";
import TeamsPage from "./pages/TeamsPage";
import News from "./components/News";
import Leagues from "./components/Leagues";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "aboutus", Component: AboutUsPage },
        { path: "contactus", Component: ContactUsPage },
        { path: "players", Component: Players },
        { path: "login", Component: LoginForm },
        { path: "profile", Component: Profile },
        { path: "teams", Component: TeamsPage },
        { path: "news", Component: News },
        { path: "leagues", Component: Leagues },
      ],
    },
    {
      path: "auth",
      Component: AuthLayout,
      children: [
        { path: "login", Component: LoginPage },
        { path: "register", Component: RegisterPage },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;