import { useState } from "react";
import ToggleGroup, { ToggleGroupOption } from "../components/ToggleGroup";
import StepperInput from "../components/StepperInput";
import { Unit } from "../types/common.type";

const options: ToggleGroupOption[] = [
  {
    label: Unit.Percentage,
    value: Unit.Percentage,
  },
  {
    label: Unit.Pixel,
    value: Unit.Pixel,
  },
];

const Homepage = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>(Unit.Percentage);
  const [steppedValue, setStepperValue] = useState<number>(0);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[280px] flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#AAAAAA]">Unit</span>
          <ToggleGroup
            options={options}
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value as Unit)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#AAAAAA]">Value</span>
          <StepperInput
            value={steppedValue}
            onChange={(value) => setStepperValue(value)}
            min={0}
            max={100}
            unit={selectedUnit}
            step={selectedUnit === Unit.Percentage ? 0.1 : 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
