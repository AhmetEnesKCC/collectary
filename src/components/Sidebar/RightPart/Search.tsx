import { FC } from "react";

import SvgRender from "../../Common/SvgRender";

import SearchSvg from "../../../assets/svg/search.svg";

interface SearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ value, setValue }) => {
  return (
    <label className="relative mb-9">
      <input
        className="bg-level-2 border-[1px] border-solid border-[#3570E0] w-full rounded-2xl px-4 py-1.5 placeholder-white outline-none"
        value={value}
        placeholder="Ara"
        onChange={(e) => setValue(e?.target?.value)}
      />
      <SvgRender
        classNames={{
          wrapper: "!absolute top-1/2 -translate-y-1/2 right-2.5",
        }}
        svg={SearchSvg}
        title="search"
      />
    </label>
  );
};

export default Search;
