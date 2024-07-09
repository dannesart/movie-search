import { it, describe, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "../../src/components/SearchForm";
describe("SearchForm", () => {
  const newSearch = vi.fn();
  beforeEach(() => {
    render(
      <SearchForm defaultValue="" onSubmit={newSearch} onClear={newSearch} />
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

  it("Should be possible to press the button with inputs", async () => {
    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");
    await fireEvent.change(searchInput, { target: { value: "Jurassic Park" } });
    expect(searchButton).toHaveProperty("disabled", false);
    await fireEvent.click(searchButton);
    await waitFor(() => {
      expect(newSearch).toHaveBeenCalledOnce();
      expect(newSearch).toHaveBeenCalledWith("Jurassic Park");
    });
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(searchButton).toHaveProperty("disabled", true);
  });
});
