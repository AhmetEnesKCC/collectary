import { useDispatch, useSelector } from "react-redux";
import { MessageBoxType } from "../../types/message.d";
import { MessageBox } from "./MessageBox";
import { RoomDetail } from "./RoomDetail";
import { SendMessage } from "./SendMessage";
import { BiArrowBack } from "react-icons/bi";
import { setChat } from "../../redux/chatSlice";
import { useEffect } from "react";
import usePush from "../../hooks/usePush";

export const Chat = () => {
  const dummyMessages: MessageBoxType[] = [
    {
      id: "a1",
      name: "John Doe",
      time: "12.10.2024",
      pic: "",
      message: "Hello i want to play a game on your NFT",
      type: "sender",
    },
    {
      id: "a2",
      name: "Kutay Sarı",
      time: "12.10.2024",
      pic: "",
      message: "Of course",
      type: "receiver",
    },
  ];

  const chat = useSelector((state: any) => state.chat);

  const dispatch = useDispatch();

  const { createStream } = usePush();

  const account = useSelector((state: any) => state.account);

  useEffect(() => {
    createStream(console.log);
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
          {dummyMessages?.map((message) => (
            <MessageBox message={message} key={message?.id} />
          ))}
        </div>
        <SendMessage />
      </div>
      {chat?.type === "group" && <RoomDetail />}
    </div>
  );
};
