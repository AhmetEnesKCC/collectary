import Tabs from "./Tabs";
import RightPart from "./RightPart";

const Index = () => {
  return (
    <div className="rounded-[32px] max-h-[calc(100vh_-_48px)] wrapper-border flex gap-5 bg-level-2 max-w-[350px]">
      <Tabs />
      <RightPart />
    </div>
  );
};

export default Index;
