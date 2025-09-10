import { memo } from "react";
import { twMerge } from "tailwind-merge";

export type ToggleGroupOption = {
  label: string;
  value: string;
};

type ToggleGroupProps = {
  options: ToggleGroupOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNames?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const ToggleGroup = ({ options, value, onChange, classNames }: ToggleGroupProps) => {
  return (
    <div className={twMerge("flex h-9 w-fit items-center gap-0.5 rounded-lg bg-[#212121] p-0.5", classNames)}>
      {options.map((option) => (
        <div
          key={option.value}
          className={twMerge(
            "flex h-full w-full min-w-[67px] cursor-pointer items-center justify-center rounded-md",
            option.value === value && "bg-[#424242]",
          )}
        >
          <input
            type="radio"
            className="hidden"
            id={option.value}
            name={options.map((o) => o.value).join("-")}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
          />
          <label
            htmlFor={option.value}
            className={twMerge(
              "flex h-full w-full cursor-pointer items-center justify-center px-3 text-xs font-medium text-[#AAAAAA]",
              option.value === value && "text-[#F9F9F9]",
            )}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default memo(ToggleGroup);
