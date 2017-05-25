import React from 'react';

class Company extends React.Component {
  render() {
    const details = this.props.details;

    return(
      <li className="company"
        data-is-active={this.props.active}>
          <div className="company-name">{details.name}</div>
          <div className="company-name"><a href={details.url}>{details.url}</a></div>
          <div className="company-name"><a href={`http://twitter.com/${details.twitter}`}>{details.twitter}</a></div>
      </li>
    )
  }
}

export default Company;
