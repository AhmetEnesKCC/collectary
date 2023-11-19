import SvgRender from "../Common/SvgRender";

import Teams from "../../assets/svg/team.svg";
import UserSvg from "../../assets/svg/user.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { BiChat, BiLinkExternal } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import usePush from "../../hooks/usePush";
import { useEffect } from "react";
import { setChat } from "../../redux/chatSlice";

type RoomUserType = {
  image: string;
  wallet: string;
};

type RoomUsersType = RoomUserType[];

type RoomDetail = {
  room_pic: string;
  users: RoomUsersType;
};

export const RoomDetail = () => {
  const chat = useSelector((state: any) => state.chat);

  return (
    <div className="rounded-[32px] wrapper-border w-1/4 py-5 px-6 flex flex-col items-center overflow-hidden">
      <div className="w-16 h-16 rounded-full border-white border-[1px] flex justify-center items-center">
        <SvgRender svg={Teams} title="team" />
      </div>
      <div className="flex flex-col w-full gap-y-5 mt-8 max-h-[70vh] overflow-auto">
        {chat?.data?.groupInformation?.members?.map((user: RoomUserType) => (
          <ProfilePopup user={user} />
        ))}
      </div>
    </div>
  );
};

const ProfilePopup: React.FC<{ user: RoomUserType }> = ({ user }) => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <div
          className={`flex relative hover:bg-[#803FEA33] gap-2 cursor-pointer items-center px-4 py-1.5 rounded-2xl `}
        >
          <div
            className={`border-[1px] border-white min-w-[32px] h-8 flex items-center justify-center rounded-full`}
          >
            <SvgRender svg={UserSvg} title="user" />
          </div>
          <h4 className="text-[14px] font-normal overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
            {user?.wallet}
          </h4>
        </div>
      </PopoverTrigger>
      <PopoverContent
        outlineColor={"transparent"}
        border={"transparent"}
        className="bg-transparent outline-none "
      >
        <UserContent user={user} />
      </PopoverContent>
    </Popover>
  );
};

const UserContent: React.FC<{ user: RoomUserType }> = ({ user }) => {
  const { getNftOfUser } = usePush();

  const dispatch = useDispatch();

  const chat = useSelector((state: any) => state.chat);

  useEffect(() => {
    getNftOfUser(user.wallet).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="flex-1 bg-level-2 wrapper-border p-[16px] bg-opacity-80 backdrop-blur-[80px]">
      <div className="flex justify-center items-center gap-x-[16px]">
        <div
          onClick={() => {
            dispatch(setChat({ data: user, type: "dm", backChat: chat }));
          }}
          className="bg-level-2 p-2 rounded-full"
        >
          <BiChat size={16} />
        </div>
        <div className="w-[64px] h-[64px] wrapper-border rounded-full overflow-hidden">
          <img />
        </div>
        <div className="bg-level-2 p-2 rounded-full">
          <BiLinkExternal size={16} />
        </div>
      </div>
      <p className="text-center mt-[16px]">{user.wallet}</p>
    </div>
  );
};
