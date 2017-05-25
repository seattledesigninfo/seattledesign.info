import React from 'react';

class Details extends React.Component {
  render() {
    const details = this.props.details;

    if (details.name) {
      return(
        <div>
          <h2>{details.name}</h2>
          <a href={details.url} className="external">{details.url}</a>
          <div className="size">{details.size}</div>
          <div className="services">
            { details.services.map(service => <span className="service">{service}</span>) }
          </div>
          <div>{details.description}</div>
        </div>
      )
    } else {
      return(
        <div />
      )
    }
  }
}

export default Details;
