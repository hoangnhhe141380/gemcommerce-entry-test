import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StepperInput from "../components/StepperInput";
import { Unit } from "../types/common.type";

import "../misc/Number";
import "../misc/String";

const Component = ({
  id,
  min,
  max,
  unit,
  step,
}: {
  id: string;
  min: number;
  max: number;
  unit: Unit;
  step: number;
}) => {
  const [value, setValue] = useState(0);

  return <StepperInput id={id} value={value} onChange={setValue} min={min} max={max} unit={unit} step={step} />;
};

describe("StepperInput pixel", () => {
  it("Replace comma with dot", () => {
    render(<Component id="pixel" min={0} max={100} unit={Unit.Pixel} step={0.1} />);

    const input = screen.getByTestId("stepper-input-pixel") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12,3" } });
    fireEvent.blur(input);

    expect(input.value).toBe("12.3");
  });

  it("Format number if value is invalid case exceed max", () => {
    const input = screen.getByTestId("stepper-input-pixel") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "123a" } });
    fireEvent.blur(input);

    expect(input.value).toBe("123");
  });

  it("Format number if value is invalid case valid range", () => {
    const input = screen.getByTestId("stepper-input-pixel") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "12a3" } });
    fireEvent.blur(input);

    expect(input.value).toBe("12");
  });

  it("Format number if value is invalid case back to previous value 1", () => {
    const input = screen.getByTestId("stepper-input-pixel") as HTMLInputElement;

    // Set previous value to 36
    fireEvent.change(input, { target: { value: "36" } });
    fireEvent.blur(input);

    fireEvent.change(input, { target: { value: "a123" } });
    fireEvent.blur(input);

    expect(input.value).toBe("36");
  });

  it("Format number if value is invalid case back to previous value 2", () => {
    const input = screen.getByTestId("stepper-input-pixel") as HTMLInputElement;

    // Set previous value to 45
    fireEvent.change(input, { target: { value: "45" } });
    fireEvent.blur(input);

    fireEvent.change(input, { target: { value: "123.4.5" } });
    fireEvent.blur(input);

    expect(input.value).toBe("45");
  });

  it("Number is negative", () => {
    const input = screen.getByTestId("stepper-input-pixel") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "-5" } });
    fireEvent.blur(input);

    expect(input.value).toBe("0");
  });
});

describe("StepperInput percent", () => {
  it("Format number if value is invalid case exceed 100", () => {
    render(<Component id="percentage" min={0} max={100} unit={Unit.Percentage} step={0.1} />);

    const input = screen.getByTestId("stepper-input-percentage") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.blur(input);

    expect(input.value).toBe("100");
  });

  it("Click increment button", () => {
    const input = screen.getByTestId("stepper-input-percentage") as HTMLInputElement;
    const incrementButton = screen.getByTestId("increment-stepper-button-percentage") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "33" } });
    fireEvent.blur(input);

    fireEvent.click(incrementButton);

    expect(input.value).toBe("33.1");
  });

  it("Click decrement button", () => {
    const input = screen.getByTestId("stepper-input-percentage") as HTMLInputElement;
    const decrementButton = screen.getByTestId("decrement-stepper-button-percentage") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "33" } });
    fireEvent.blur(input);

    fireEvent.click(decrementButton);

    expect(input.value).toBe("32.9");
  });

  it("Decrement button should be disabled on min", () => {
    const input = screen.getByTestId("stepper-input-percentage") as HTMLInputElement;
    const decrementButton = screen.getByTestId("decrement-stepper-button-percentage") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.blur(input);

    expect(decrementButton.disabled).toBe(true);
  });

  it("Increment button should be disabled on max", () => {
    const input = screen.getByTestId("stepper-input-percentage") as HTMLInputElement;
    const incrementButton = screen.getByTestId("increment-stepper-button-percentage") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.blur(input);

    expect(incrementButton.disabled).toBe(true);
  });
});
