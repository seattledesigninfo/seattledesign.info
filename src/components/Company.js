import React from 'react';

class Company extends React.Component {
  render() {
    const details = this.props.details;

    return(
      <li className="company" data-is-active={this.props.active} onClick={() => this.props.showDetails(this.props.details) }>
        {details.name}
      </li>
    )
  }
}

export default Company;
