import { it, describe, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../../src/components/Error";
describe("Error", () => {
  it("Should render with correct title & message", () => {
    render(<Error title="Error" message="A random error message" />);
    const title = screen.getByRole("heading");
    const message = screen.getByRole("paragraph");
    expect(title.innerHTML).toBe("Error");
    expect(message.innerHTML).toBe("A random error message");
  });
  it("Should not render if no title and message is provided", () => {
    render(<Error />);
    const message = screen.queryByTestId("message");
    expect(message).toBeNull();
  });
});
