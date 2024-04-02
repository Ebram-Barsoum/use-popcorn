import React from "react";

export default function ToggleIcon({ isOpen, toggleList }) {
  return (
    <li
      className="toggle-icon p-0 fw-bold fs-5 text-white-50  w-auto ms-auto rounded-circle cursor-pointer"
      style={{ backgroundColor: "#345" }}
      onClick={toggleList}
    >
      {isOpen ? "-" : "+"}
    </li>
  );
}
