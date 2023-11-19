import { FC } from "react";

interface TabComponentProps {
  classNames?: {
    wrapper?: string;
  };
  icon: React.ReactNode;
}

const TabComponent: FC<TabComponentProps> = ({ icon, classNames }) => {
  return (
    <div
      className={`${classNames?.wrapper} rounded-2xl flex justify-center items-center min-h-[64px] bg-white w-16 h-16 `}
    >
      {icon}
    </div>
  );
};

export default TabComponent;
