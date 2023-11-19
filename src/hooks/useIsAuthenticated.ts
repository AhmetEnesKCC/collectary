import { useAddress } from "@thirdweb-dev/react";

const useIsAuthenticated = () => {
  const address = useAddress();
  return !!address;
};

export default useIsAuthenticated;
