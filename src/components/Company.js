import React from 'react';

class Company extends React.Component {
  constructor(props) {
    super(props);

    this.filterExclusive = this.filterExclusive.bind(this);
  }

  filterExclusive(service) {
    this.props.filterExclusive(service);
  }

  render() {
    const details = this.props.details;

    return(
      <div className="company">
        <div className="company-name">
          <a href={details.url} target="_blank">{details.name}</a><br/>
          <span className="twitter-handle">
            <a href={`http://twitter.com/${details.twitter}`} target="_blank">{details.twitter}</a>
          </span>
        </div>
        <div className="company-focuses">{
          details.services.map((service, index) => {
            return(<span key={index} onClick={() => this.filterExclusive(service)} className={`company-service ${service}`}> {service} </span>)
          })
        }</div>
        <div className="company-size">{details.size}</div>
      </div>
    )
  }
}

export default Company;
