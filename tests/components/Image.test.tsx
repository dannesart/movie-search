import { it, describe, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Image from "../../src/components/Image";
describe("Image", () => {
  it("Should render an image element if path is provided", () => {
    render(<Image path="/iADOJ8Zymht2JPMoy3R7xceZprc.jpg" />);
    const image = screen.getByTestId("image");
    expect(image).toBeTruthy();
  });
  it("Should not render an image element if no path is provided", () => {
    render(<Image path="" />);
    const image = screen.getByTestId("fallback");
    expect(image).toBeTruthy();
  });
});
