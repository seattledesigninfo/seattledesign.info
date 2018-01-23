import React from "react";

export default function Navigation({ toggleAbout }) {
  return (
    <nav className="navigation">
      <ul className="navigation--list">
        <li className="navigation--brand navigation--item">
          <strong>Seattle Design</strong>
        </li>
        <li className="navigation--about navigation--item">
          <a href="#" onClick={toggleAbout}>
            What is this?
          </a>
        </li>
        <li className="navigation--add-company navigation--item">
          <a href="mailto:info@mail.seattledesign.info?subject=Add my company to the Seattle Design list">
            Add your company
          </a>
        </li>
      </ul>
    </nav>
  );
}
