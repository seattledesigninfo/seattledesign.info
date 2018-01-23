import React from "react";
import { slugify } from "../helpers";

export default function Company({ details, focuses }) {
  const isSelected = service => {
    if (focuses["All"]) {
      return true;
    }

    return `checked-${focuses[service]}`;
  };

  const twitterLink = details => {
    return (
      <span className="company-twitter-handle">
        <a
          href={`http://twitter.com/${details.twitter}`}
          rel="noopener"
          target="_blank"
        >
          {details.twitter}
        </a>
      </span>
    );
  };

  return (
    <div className="company">
      <div className="company--cell company-name">
        <a href={details.url} target="_blank" rel="noopener">
          {details.name}
        </a>
        <br />
        {details.twitter.length > 0 ? twitterLink(details) : null}
      </div>
      <div className="company--cell company-focuses">
        {details.services.map((service, index) => {
          return (
            <span
              key={index}
              className={`company-service ${isSelected(service)} ${slugify(
                service
              )}`}
            >
              {" "}
              {service}{" "}
            </span>
          );
        })}
      </div>
      <div className="company--cell company-size">{details.size}</div>
    </div>
  );
}
