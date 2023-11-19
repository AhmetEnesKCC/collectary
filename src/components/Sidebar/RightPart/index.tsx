import { useEffect, useState } from "react";

import Search from "./Search";
import { RoomCompType } from "../../../types/room.d";
import Part from "./Part";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../../redux/tabSlice";
import { admin, fetchAllChats, initialize } from "../../../utils/push";

const Index = () => {
  const [searchKey, setSearchKey] = useState<string>("");

  const [data, setData] = useState([]);

  const getRooms = async () => {
    const userAdmin = await initialize(admin);
    const rooms = await fetchAllChats(userAdmin);
    console.log(rooms);
    setData(rooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="w-full flex flex-col pr-7 py-6">
      <h1 className="text-xs font-normal mt-10 mb-5">NFT Odaları</h1>
      <Search value={searchKey} setValue={setSearchKey} />
      <div className="flex flex-col gap-y-4 overflow-auto max-w-[70vh]">
        {data
          ?.filter((d: any) =>
            d?.groupInformation?.groupName
              .toLowerCase()
              .includes(searchKey?.toLowerCase())
          )
          ?.map((chat: any) => (
            <Part
              key={chat?.chatId}
              chat={chat}
              id={chat?.chatId}
              avatar={chat?.groupInformation?.members?.[0]?.image}
              text={chat?.groupInformation?.groupName}
            />
          ))}
      </div>
    </div>
  );
};

export default Index;
