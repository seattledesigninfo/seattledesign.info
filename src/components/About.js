import React from 'react';

class About extends React.Component {
  render() {
    return(
      <div className="about">
        <a href="#" className="close-about" onClick={this.props.toggleAbout}>&times;</a>
        <p>Over the past couple months, I have been compiling a list of companies in Seattle that are focused in the design industry. My desire came out of finding a job, but as I continued to research, I kept running into unreliable and out dated information.</p>
        <p><strong>Seattle Design List</strong> is the result of my  research. It's still a work in progress, but I hope it helps those who find themselves in the same situation that I was in.</p>
        <p>If any information is incorrect, or out of date please <a className="inverse-anchor" href="mailto:zack@zackseuberling.com">notify me</a> about any changes that should be made.</p>
      </div>
    )
  }
}

export default About;
