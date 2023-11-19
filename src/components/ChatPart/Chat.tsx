import { useDispatch, useSelector } from "react-redux";
import { MessageBox } from "./MessageBox";
import { RoomDetail } from "./RoomDetail";
import { SendMessage } from "./SendMessage";
import { BiArrowBack } from "react-icons/bi";
import { setChat } from "../../redux/chatSlice";
import { useEffect, useState } from "react";
import usePush from "../../hooks/usePush";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { nanoid } from "nanoid";
import EthersService from "../../utils/ethers";
import NFTImage from "../../assets/nft.png";

export const Chat = () => {
  const chat = useSelector((state: any) => state.chat);

  const dispatch = useDispatch();

  const { createStream, getChatHistory, sendMessage } = usePush();

  const [messages, setMessages] = useState<any[]>([]);
  const address = useAddress();

  useEffect(() => {
    createStream((m) => {
      setMessages((prev) => [
        ...prev,
        {
          is_me: m?.from?.split(":")[1] === address,
          message: m?.message?.content,
          id: nanoid(),
          time: parseInt(m?.timestamp),
          name: m?.from?.split(":")[1],
        },
      ]);
    }).then(() => {
      getChatHistory(chat.id ?? chat?.data?.wallet).then((res) => {
        const m = res?.map((message) => {
          return {
            is_me: message?.fromCAIP10?.split(":")[1] === address,
            message: message?.messageObj?.content,
            id: message?.cid,
            time: message?.timestamp,
            name: message?.fromCAIP10?.split(":")[1],
          };
        });
        setMessages(m);
      });
    });
  }, [chat]);

  return (
    <div className="wrapper-border rounded-[32px] w-full h-full max-h-[100vh] overflow-hidden p-[30px] flex gap-x-10 justify-between">
      <div className="w-full flex  flex-col justify-between ">
        <div className="flex items-center space-x-[12px]">
          {chat?.type === "dm" && (
            <div
              onClick={() => {
                dispatch(setChat(chat?.backChat));
              }}
              className="p-2 bg-level-2 wrapper-border rounded-full"
            >
              <BiArrowBack />
            </div>
          )}
          <h1 className="font-normal text-[24px]">
            {chat?.type === "group"
              ? chat?.data?.groupInformation?.groupName
              : chat?.data?.wallet}
          </h1>
        </div>
        <div className="flex flex-1 flex-col gap-y-10 mt-9 overflow-auto max-h-[55vh]">
          {messages
            ?.sort((a, b) => {
              if (a.timestamp > b.timestamp) {
                return 1;
              }
              return -1;
            })
            ?.map((message) => (
              <MessageBox message={message} key={message?.id} />
            ))}
          <NFTSendMessage />
        </div>
        <SendMessage
          onSend={(message) => {
            sendMessage(chat?.id ?? chat?.data?.wallet, message);
          }}
        />
      </div>
      {chat?.type === "group" && <RoomDetail />}
    </div>
  );
};

const NFTSendMessage = () => {
  const signer = useSigner();
  const handleClick = async () => {
    const address = await signer?.getAddress();
    const ethers = new EthersService();
    ethers.transferTokensPayNative(
      "12532609583862916517",
      signer,
      address as any,
      "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
      10,
      console.log
    );
  };

  return (
    <div
      className="w-max  self-end gap-y-[16px] py-[16px] flex flex-col items-center gap-x-[20px]  px-[20px] rounded-md"
      style={{
        background:
          "linear-gradient(180deg, rgba(168, 136, 220, 0.41) 0%, rgba(97, 0, 255, 0.41) 100%)",
      }}
    >
      <div className="flex items-center gap-x-[16px]">
        <div className="w-[96px] full">
          <img src={NFTImage} />
        </div>

        <div className="whitespace-nowrap">10 CCIP - BnM</div>
      </div>
      <button
        onClick={handleClick}
        className="wrapper-border w-full rounded-lg py-1 flex-1"
        style={{
          background:
            "linear-gradient(180deg, rgba(147, 82, 255, 0.55) 0%, rgba(143, 85, 239, 0.94) 86.98%, #8E55ED 100%)",
        }}
      >
        Buy
      </button>
    </div>
  );
};
