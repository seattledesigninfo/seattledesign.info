import React from 'react';

class Company extends React.Component {
  render() {
    const details = this.props.details;

    return(
      <div className="company" data-is-active={this.props.active}>
        <div className="company-name">
          <a href={details.url} target="_blank">{details.name}</a><br/>
          <span className="twitter-handle">
            <a href={`http://twitter.com/${details.twitter}`} target="_blank">{details.twitter}</a>
          </span>
        </div>
        <div className="company-focuses">{
          details.services.map((service, index) => {
            return(<span key={index} onClick={this.filterExclusive} className={`service ${service}`}> {service} </span>)
          })
        }</div>
        <div className="company-size">{details.size}</div>
      </div>
    )
  }
}

export default Company;
