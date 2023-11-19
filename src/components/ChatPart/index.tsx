import SvgRender from "../Common/SvgRender";

import CopySvg from "../../assets/svg/copy.svg";

import CopyButton from "../Common/CopyComp";
import { Chat } from "./Chat";
import { useAddress, useDisconnect, useLogout } from "@thirdweb-dev/react";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";

const Index = () => {
  const wallet_address = useAddress() ?? "";
  const { logout } = useLogout();

  const disconnect = useDisconnect();

  const chat = useSelector((state: any) => state?.chat);

  const shortenedAddress = `${wallet_address?.substring(
    0,
    4
  )}...${wallet_address?.substring(wallet_address?.length - 4)}`;
  return (
    <div className="w-full h-[calc(100vh_-_96px)]">
      <div className="flex justify-between items-start space-x-[32px]">
        <div>
          <h3 className="text-xs font-normal text-white opacity-60">
            wallet address
          </h3>
          <CopyButton copyElement={wallet_address}>
            <div className="flex items-center gap-x-2.5">
              <SvgRender svg={CopySvg} title="copy" />
              <span className="text-white text-[18px] font-bold">
                {shortenedAddress}
              </span>
            </div>
          </CopyButton>
        </div>
        <button
          onClick={() => {
            disconnect().then(() => {
              logout();
            });
          }}
          className="flex bg-red-600 bg-opacity-10 p-2 gap-x-[12px] items-center"
        >
          Logout
          <BiLogOut />
        </button>
      </div>
      {(chat?.id || chat?.type === "dm") && <Chat />}
    </div>
  );
};

export default Index;
