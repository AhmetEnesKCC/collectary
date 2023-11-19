import { FC } from "react";

interface SvgRenderProps {
  svg: string | undefined;
  title: string | undefined;
  classNames?: {
    wrapper?: string;
  };
}
const SvgRender: FC<SvgRenderProps> = ({ svg, title, classNames }) => {
  return <img className={classNames?.wrapper} src={svg} alt={title} />;
};

export default SvgRender;
