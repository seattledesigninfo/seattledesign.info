import React from "react";
import { slugify } from "../helpers";

export default function Checkbox({ index, focuses, focus, type }) {
  return (
    <div className="checkbox" data-id={focuses[focus]}>
      <input
        name={type}
        type="checkbox"
        id={`${type}-${index}`}
        checked={focuses[focus]}
        readOnly
        value={focus}
      />
      <label
        htmlFor={`${type}-${index}`}
        className={`checked--${focuses[focus]}`}
        key={focus}
        tabIndex="0"
      >
        <span className={`company-service ${slugify(focus)}`}>{focus}</span>
      </label>
    </div>
  );
}
