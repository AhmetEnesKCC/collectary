import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="bg-level-2 h-screen w-full flex gap-x-10 text-white py-6 pl-8 pr-10">
      {children}
    </main>
  );
};

export default Layout;
