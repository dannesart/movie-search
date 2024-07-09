import { it, describe, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../../src/components/SearchForm";
describe("SearchForm", () => {
  const newSearch = vi.fn();
  beforeEach(() => {
    render(
      <SearchForm
        defaultValue=""
        onSubmit={() => newSearch}
        onClear={() => newSearch}
      />
    );
  });
  it("Should render with an input and button", () => {
    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");
    expect(searchButton).toHaveProperty("disabled", true);
    expect(searchInput.value).toBe("");
  });
  it("Should not be possible to press the button without inputs", () => {
    const searchButton = screen.getByRole("button");
    expect(searchButton).toHaveProperty("disabled", true);
  });

  it("Should be possible to press the button without inputs", () => {
    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Jurassic Park" } });
    expect(searchButton).toHaveProperty("disabled", false);
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(searchButton).toHaveProperty("disabled", true);
  });
});
