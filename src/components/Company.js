import React from 'react';

class Company extends React.Component {
  render() {
    const details = this.props.details;

    return(
      <li className="company" data-is-active={this.props.active}>
        <div className="company-name">
          <a href={details.url} target="_blank">{details.name}</a><br/>
          <span className="twitter-handle">
            <a href={`http://twitter.com/${details.twitter}`} target="_blank">{details.twitter}</a>
          </span>
        </div>
        <div className="company-focuses">{
          details.services.map((service) => {
            return(<span className={`service ${service}`}> {service} </span>)
          })
        }</div>
        <div className="company-size">{details.size}</div>
      </li>
    )
  }
}

export default Company;
