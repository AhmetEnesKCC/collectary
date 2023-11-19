import { FC, useState } from "react";

interface CopyButtonProps {
  children: React.ReactNode;
  copyElement: string | null;
}

const CopyButton: FC<CopyButtonProps> = ({ children, copyElement }) => {
  const copyTextToClipboard = () => {
    if (copyElement) {
      navigator.clipboard
        .writeText(copyElement)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((error) => {
          console.error("Metin kopyalanamadı: ", error);
        });
    }
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative">
      {isHovered && !isCopied && (
        <div className="bg-level-3 p-2 rounded-lg text-[10px] font-normal z-[9999] absolute animation-all -top-8 right-0">
          Copy to clipboard
        </div>
      )}
      {isCopied && (
        <div className="bg-level-3 p-2 rounded-lg text-[10px] font-normal z-[9999] absolute animation-all -top-8 right-0">
          Copied
        </div>
      )}
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={copyTextToClipboard}
      >
        {children}
      </button>
    </div>
  );
};

export default CopyButton;
