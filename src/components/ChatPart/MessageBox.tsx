import { FC } from "react";

import { MessageBoxType } from "../../types/message.d";
import SvgRender from "../Common/SvgRender";

import UserSvg from "../../assets/svg/user.svg";

interface MessageBoxProps {
  message: MessageBoxType;
}

export const MessageBox: FC<MessageBoxProps> = ({ message }) => {
  return (
    <div
      className={`rounded-[16px] border-[1px] w-1/3 px-5 py-4 ${
        message?.type === "sender"
          ? "border-secondary-1"
          : "border-primary-1 self-end"
      } `}
    >
      <div className="flex gap-4">
        <div className="rounded-full w-12 h-12 border-[#D9D9D9] border-[1px] flex items-center justify-center ">
          <SvgRender svg={UserSvg} title="user" />
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="text-sm font-bold">{message?.name}</h3>
          <span>{message?.time}</span>
        </div>
      </div>
      <p className="mt-7 text-lg font-semibold">{message?.message}</p>
    </div>
  );
};
