import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Aboutuspage from "./pages/Aboutuspage";
import Contactuspage from "./pages/Contactuspage";
import Authlayout from "./Authlayout";
import Loginpage from "./pages/LoginForm";
import Registerpage from "./pages/Registerpage";
import Profile from "./pages/Profile";
import Players from "./pages/Players";
import LoginForm from "./pages/LoginForm";
import Team from "./component/Team";
import TeamsPage from "./pages/TeamsPage";
import News from "./component/News";
import Leagues from "./component/Leagues";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "aboutus", Component: Aboutuspage },
        { path: "contactus", Component: Contactuspage },
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
      Component: Authlayout,
      children: [
        { path: "login", Component: Loginpage },
        { path: "register", Component: Registerpage },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
