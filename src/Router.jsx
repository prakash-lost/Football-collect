import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import("./pages/Home")).default,
          }),
        },
        {
          path: "aboutus",
          lazy: async () => ({
            Component: (await import("./pages/AboutUsPage")).default,
          }),
        },
        {
          path: "contactus",
          lazy: async () => ({
            Component: (await import("./pages/ContactUsPage")).default,
          }),
        },
        {
          path: "players",
          lazy: async () => ({
            Component: (await import("./pages/Players")).default,
          }),
        },
        {
          path: "players/:id",
          lazy: async () => ({
            Component: (await import("./pages/PlayerDetailPage")).default,
          }),
        },
        {
          path: "login",
          lazy: async () => ({
            Component: (await import("./pages/LoginForm")).default,
          }),
        },
        {
          path: "profile",
          lazy: async () => ({
            Component: (await import("./pages/Profile")).default,
          }),
        },
        {
          path: "teams",
          lazy: async () => ({
            Component: (await import("./pages/TeamsPage")).default,
          }),
        },
        {
          path: "news",
          lazy: async () => ({
            Component: (await import("./pages/NewsPage")).default,
          }),
        },
        {
          path: "leagues",
          lazy: async () => ({
            Component: (await import("./pages/LeaguesPage")).default,
          }),
        },
        {
          path: "fixtures",
          lazy: async () => ({
            Component: (await import("./pages/FixturesPage")).default,
          }),
        },
        {
          path: "fixtures/:id",
          lazy: async () => ({
            Component: (await import("./pages/MatchDetailPage")).default,
          }),
        },
        {
          path: "matches/:id",
          lazy: async () => ({
            Component: (await import("./pages/MatchDetailPage")).default,
          }),
        },
      ],
    },
    {
      path: "auth",
      Component: AuthLayout,
      children: [
        {
          path: "login",
          lazy: async () => ({
            Component: (await import("./pages/LoginForm")).default,
          }),
        },
        {
          path: "register",
          lazy: async () => ({
            Component: (await import("./pages/RegisterPage")).default,
          }),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
