import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MinusIcon } from "../assets/svg/MinusIcon";
import { PlusIcon } from "../assets/svg/PlusIcon";
import { twMerge } from "tailwind-merge";
import { Unit } from "../types/common.type";
import Tooltip from "./Tooltip";

type StepperInputProps = {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: Unit;
  step: number;
};

const StepperInput = ({ id, value, onChange, min, max: _max, unit, step }: StepperInputProps) => {
  const [innerInput, setInnerInput] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef<string>(value.toString());

  const max = useMemo(() => {
    return unit === Unit.Percentage ? 100 : _max;
  }, [unit, _max]);

  const disabledIncrement = useMemo(() => {
    return unit === Unit.Percentage ? value >= 100 : value >= max;
  }, [unit, value, max]);
  const disabledDecrement = value <= min;

  const handleFormat = useCallback(
    (value: string): number => {
      if (!value) return min;

      // Replace comma with dot
      let formatted = value.replace(/,/g, ".");

      // If negative number then set to 0
      if (!isNaN(formatted.toNumber()) && formatted.toNumber() < 0) {
        formatted = "0";
      }

      // If the string contains characters that are not numbers or dots, only take from the beginning to the position of that character, and cut off the rest
      const invalidCharIndex = formatted.search(/[^0-9.]/);
      if (invalidCharIndex !== -1) {
        formatted = formatted.slice(0, invalidCharIndex);
        // If the string is empty after removing invalid characters, set it to latest previous value
        if (!formatted) formatted = prevValueRef.current;
      }

      // If the string parsed is not a number, set it to latest previous value
      if (isNaN(formatted.toNumber())) {
        formatted = prevValueRef.current;
      }

      // If the string parsed is a number and less than 0, set it to 0
      if (!isNaN(formatted.toNumber()) && formatted.toNumber() < 0) {
        formatted = "0";
      }

      // If number is greater than 100 and unit is percentage, set it to 100
      if (unit === Unit.Percentage && formatted.toNumber() > 100) {
        formatted = "100";
      }

      prevValueRef.current = formatted.toString();
      return formatted.toFixedNumber(-Math.log10(step));
    },
    [min, step, unit],
  );

  const handleStep = (number: number) => {
    setInnerInput(number.toFixedString(-Math.log10(step)));
    handleBlur(number.toFixedString(-Math.log10(step)));
  };

  const handleBlur = useCallback(
    (value: string) => {
      const result = handleFormat(value);
      setInnerInput(result.toString());
      onChange(result);
    },
    [handleFormat, onChange],
  );

  const handleChangeUnit = useCallback(() => {
    if (unit !== Unit.Percentage) return;
    handleBlur(unit);
  }, [unit, handleBlur]);

  useEffect(() => {
    handleChangeUnit();
  }, [handleChangeUnit, unit]);

  return (
    <div
      className={twMerge(
        "group flex h-9 w-[140px] items-center rounded-lg bg-[#212121]",
        isFocused && "ring-1 ring-[#3C67FF]",
      )}
    >
      <Tooltip content={`Value must greater than ${min}`} position="top" when={disabledDecrement}>
        <button
          className="m-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-l-lg group-hover:bg-[#3B3B3B] hover:bg-[#3B3B3B] disabled:cursor-not-allowed disabled:bg-[#212121]"
          data-testid={`decrement-stepper-button-${id}`}
          disabled={disabledDecrement}
          onClick={() => handleStep(value - step)}
        >
          <MinusIcon width={20} height={20} />
        </button>
      </Tooltip>

      <input
        ref={inputRef}
        id={`stepper-input-${id}`}
        data-testid={`stepper-input-${id}`}
        type="text"
        value={innerInput}
        onChange={(e) => setInnerInput(e.target.value)}
        onBlur={(e) => {
          handleBlur(e.target.value);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        className="h-full w-[68px] border-none bg-transparent text-center text-sm font-normal text-[#F9F9F9] outline-none group-hover:bg-[#3B3B3B] hover:bg-[#3B3B3B]"
        step={step}
        min={min}
        max={max}
      />

      <Tooltip content={`Value must smaller than ${max}`} position="top" when={disabledIncrement}>
        <button
          className="m-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-r-lg group-hover:bg-[#3B3B3B] hover:bg-[#3B3B3B] disabled:cursor-not-allowed disabled:bg-[#212121]"
          data-testid={`increment-stepper-button-${id}`}
          disabled={disabledIncrement}
          onClick={() => handleStep(value + step)}
        >
          <PlusIcon width={20} height={20} />
        </button>
      </Tooltip>
    </div>
  );
};

export default memo(StepperInput);
