import { useMetamask } from "@thirdweb-dev/react";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import Metamask from "../assets/svg/metamask.svg";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();

  const loginMetamask = useMetamask();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full h-full flex  items-center justify-center">
      <div className="flex  items-center justify-center w-[300px] h-[200px] wrapper-border">
        <button
          className="w-[80%] h-[60px] flex items-center justify-center border-metamask border-2"
          onClick={() => loginMetamask()}
        >
          <img src={Metamask} />
        </button>
      </div>
    </div>
  );
};

export default Login;
