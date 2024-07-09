import { useState, KeyboardEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function Form({
  defaultValue,
  onSubmit,
  onClear,
}: {
  defaultValue: string;
  onSubmit: (value: string) => {};
  onClear: () => {};
}) {
  const [value, setValue] = useState<string>(defaultValue || "");
  const canSubmit = () => {
    return value.length > 0;
  };

  const handleSubmit = () => {
    if (canSubmit()) onSubmit(value);
  };

  const handleClear = () => {
    setValue("");
    onClear();
  };

  const handleKeywordKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter") handleSubmit();
  };

  return (
    <div className="flex gap-3 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          name="search"
          className="px-4 py-3 border-2 w-full border-slate-200 focus:border-rose-300 outline-none rounded-lg"
          placeholder="ex. Jurassic Park"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeywordKeypress}
        />
        {canSubmit() && (
          <button
            name="clear"
            className="absolute right-0.5 top-0 bottom-0 px-4 flex items-center  text-rose-400 rounded-lg cursor-pointer  disabled:bg-rose-400/20"
            onClick={handleClear}
          >
            <FaTimes />
          </button>
        )}
      </div>
      <button
        type="submit"
        name="submit"
        className="px-4 md:px-8 py-3 bg-rose-400 text-white rounded-lg cursor-pointer hover:bg-rose-500 disabled:bg-rose-400/20"
        disabled={!canSubmit()}
        onClick={handleSubmit}
      >
        <FaSearch />
      </button>
    </div>
  );
}
