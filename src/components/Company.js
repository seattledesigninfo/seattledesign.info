import React from "react";

export default function Company({ company, focuses }) {
  const selectedFocus = focus => {
    if (focuses[focus]) {
      return <span className="company__services--selected">{focus}</span>;
    }

    return focus;
  };

  const twitterLink = company => {
    if (!company.twitter) {
      return;
    }

    return (
      <a
        className="company__social--twitter"
        href={`http://twitter.com/${company.twitter}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {company.twitter}
      </a>
    );
  };

  return (
    <article className="company">
      <header className="company__header">
        <h1 className="company__name">
          <a href={company.url} target="_blank" rel="noopener noreferrer">
            {company.name}
          </a>
        </h1>
        <div className="company__size">{company.size}</div>
      </header>

      <div className="company__meta">
        <div className="company__services">
          <h6>Services</h6>
          {company.services.map(service => (
            <span key={service} className="company__service">
              {selectedFocus(service)}
            </span>
          ))}
        </div>
      </div>

      <div className="company__social">{twitterLink(company)}</div>
    </article>
  );
}
