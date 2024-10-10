import React from "react";
import { render, cleanup } from "@testing-library/react";
import { useRunOnUnmount } from "../useRunOnUnmount";

const TestComponent: React.FC<{ onUnmount: () => void }> = ({ onUnmount }) => {
  useRunOnUnmount(onUnmount);
  return <div>Test Component</div>;
};

describe("useRunOnUnmount", () => {
  afterEach(cleanup);

  it("should call the callback on unmount", () => {
    const mockCallback = jest.fn();

    const { unmount } = render(<TestComponent onUnmount={mockCallback} />);

    expect(mockCallback).not.toHaveBeenCalled();

    unmount();

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback if the component does not unmount", () => {
    const mockCallback = jest.fn();

    const { rerender } = render(<TestComponent onUnmount={mockCallback} />);

    expect(mockCallback).not.toHaveBeenCalled();

    rerender(<TestComponent onUnmount={mockCallback} />);

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
