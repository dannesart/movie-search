import { it, describe, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Movie from "../../src/components/Movie";
describe("Movie", () => {
  beforeEach(() => {
    render(<Movie title="Jurassic Park" image="/" id="3424" />);
  });
  it("Should render with correct title", () => {
    const title = screen.getByRole("heading");
    expect(title.innerHTML).toBe("Jurassic Park");
  });
});
