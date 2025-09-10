import { memo, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TooltipProps = {
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  when: boolean;
};

const Tooltip = ({ content, position = "top", children, when }: TooltipProps) => {
  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses: Record<string, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-[#212121]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[#212121]",
    left: "left-full top-1/2 -translate-y-1/2 border-l-[#212121]",
    right: "right-full top-1/2 -translate-y-1/2 border-r-[#212121]",
  };

  return (
    <div className="group relative inline-block">
      {children}
      {when && (
        <div
          className={twMerge(
            "absolute bottom-full mb-2 hidden w-max rounded-md bg-[#212121] px-2 py-[3px] text-xs text-[#F9F9F9] transition-opacity group-hover:block",
            positionClasses[position],
          )}
        >
          {content}
          <span className={twMerge("absolute border-4 border-transparent", arrowClasses[position])} />
        </div>
      )}
    </div>
  );
};

export default memo(Tooltip);
