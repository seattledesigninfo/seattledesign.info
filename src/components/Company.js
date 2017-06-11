import React from 'react';
import { slugify } from '../helpers';

class Company extends React.Component {
  constructor(props) {
    super(props);

    this.filterExclusive = this.filterExclusive.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  filterExclusive(service) {
    this.props.filterExclusive(service);
  }

  isSelected(service) {
    if (this.props.focuses["All"]) { return true; }

    return `checked-${this.props.focuses[service]}`;
  }

  render() {
    const details = this.props.details;

    return(
      <div className="company">
        <div className="company--cell company-name">
          <a href={details.url} target="_blank">{details.name}</a><br/>
          <span className="company-twitter-handle">
            <a href={`http://twitter.com/${details.twitter}`} target="_blank">{details.twitter}</a>
          </span>
        </div>
        <div className="company--cell company-focuses">{
          details.services.map((service, index) => {
            return(<span key={index} onClick={() => this.filterExclusive(service)} className={`company-service ${this.isSelected(service)} ${slugify(service)}`}> {service} </span>)
          })
        }</div>
        <div className="company--cell company-size">{details.size}</div>
      </div>
    )
  }
}

export default Company;
