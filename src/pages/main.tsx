import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatPart from "../components/ChatPart";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import usePush from "../hooks/usePush";

const Main = () => {
  const isAuthenticated = useIsAuthenticated();

  const { initialize } = usePush();

  useEffect(() => {
    if (isAuthenticated) {
      initialize();
    }
  }, [isAuthenticated]);

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
