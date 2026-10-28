import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";

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
            Component: (await import("./components/News")).default,
          }),
        },
        {
          path: "leagues",
          lazy: async () => ({
            Component: (await import("./components/Leagues")).default,
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
