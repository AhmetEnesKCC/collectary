import React from "react";
import Sidebar from "../components/Sidebar";
import ChatPart from "../components/ChatPart";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const Main = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Sidebar />
      <ChatPart />
    </>
  );
};

export default Main;
