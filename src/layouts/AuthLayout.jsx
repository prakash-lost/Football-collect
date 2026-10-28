import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center selection:bg-primary selection:text-primary-foreground">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
