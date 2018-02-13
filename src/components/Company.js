import React from "react";

export default function Company({ company }) {
  const twitterLink = company => {
    if (!company.twitter) {
      return;
    }

    return (
      <span className="company__social--twitter">
        <a
          href={`http://twitter.com/${company.twitter}`}
          rel="noopener"
          target="_blank"
        >
          {company.twitter}
        </a>
      </span>
    );
  };

  return (
    <article className="company">
      <header className="company__header">
        <h1 className="company__name">
          <a href={company.url} target="_blank" rel="noopener">
            {company.name}
          </a>
        </h1>
        <div className="company__size">{company.size}</div>
      </header>

      <div className="company__meta">
        <div className="company__services">
          {company.services.map(service => (
            <span className="company__service">{service}</span>
          ))}
        </div>
      </div>

      <div className="company__social">{twitterLink(company)}</div>
    </article>
  );
}
