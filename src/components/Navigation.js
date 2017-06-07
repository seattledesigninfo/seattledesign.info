import React from 'react';

class Navigation extends React.Component {
  render() {
    return(
      <nav>
        <ul className="navigation">
          <li className="navigation-item">
            <strong>Seattle Design</strong>
          </li>
          <li className="navigation-item">
            <a href="#" onClick={this.props.toggleAbout}>What is this?</a>
          </li>
          <li className="navigation-item">
            <a href="mailto:info@mail.seattledesign.info?subject=Add my company to the Seattle Design list">Add your company</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;
