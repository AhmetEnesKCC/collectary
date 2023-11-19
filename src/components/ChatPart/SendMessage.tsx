import { useState } from "react";

import SvgRender from "../Common/SvgRender";
import AttachSvg from "../../assets/svg/attach.svg";
import SendSvg from "../../assets/svg/send.svg";

export const SendMessage = () => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(message);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="relative w-full mt-5 flex ">
        <SvgRender
          svg={AttachSvg}
          title="attach"
          classNames={{
            wrapper: "absolute left-5 top-1/2 -translate-y-1/2",
          }}
        />
        <input
          autoComplete="off"
          name="message"
          className="w-full bg-[#FFFFFF1F] wrapper-border !border-[1px] py-5 pl-12 overflow-auto pr-20 rounded-2xl outline-none h-20"
          value={message}
          onChange={(e) => setMessage(e?.target?.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center absolute top-1/2  -translate-y-1/2 right-5 bg-[#803FEA] w-12 h-12 rounded-2xl"
        >
          <SvgRender svg={SendSvg} title="send" />
        </button>
      </label>
    </form>
  );
};
