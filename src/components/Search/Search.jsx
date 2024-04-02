import React, { useRef } from "react";
import { useKey } from "../../useKey";

export default function Search({ search, setSearch }) {
  const input = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === input.current) return;
    setSearch("");
    input.current.focus();
  });

  return (
    <div className="search w-25">
      <input
        type="search"
        placeholder="Search for movies..."
        className="form-control shadow border-0"
        value={search}
        ref={input}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}
