import SvgRender from "../../Common/SvgRender";
import TabComponent from "./TabComponent";

import UserSvg from "../../../assets/svg/user.svg";
import DoorSvg from "../../../assets/svg/door.svg";
import SettingSvg from "../../../assets/svg/setting.svg";
import MessageSvg from "../../../assets/svg/message.svg";

const Index = () => {
  return (
    <div className="flex wrapper-border flex-col gap-y-6 items-center bg-level-2 rounded-[32px] p-[18px] max-h-[calc(100vh_-_48px)] overflow-auto">
      <TabComponent icon={<SvgRender svg={UserSvg} title="user" />} />
      <TabComponent
        icon={<SvgRender svg={DoorSvg} title="door" />}
        classNames={{ wrapper: "!bg-secondary-1" }}
      />
      <TabComponent icon={<SvgRender svg={SettingSvg} title="user" />} />
      <TabComponent icon={<SvgRender svg={MessageSvg} title="door" />} />
    </div>
  );
};

export default Index;
