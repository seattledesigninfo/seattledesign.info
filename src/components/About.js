import React from 'react';

class About extends React.Component {
  render() {
    return(
      <div className="about">
        <div className="close-about">
          <a href="#" onClick={this.props.toggleAbout}>&times;</a>
        </div>

        <p>Over the past couple months, I have been compiling a list of companies in Seattle that are focused in the design industry. My desire came out of finding a job, but as I continued to research, I kept running into unreliable and out dated information. You will not find companies that have dedicated in house design or development jobs (Amazon, Microsoft, etc.) because those are easy to find.</p>
        <p><strong>Seattle Design</strong> is the result of my  research. It's still a work in progress, but I hope it helps those who find themselves in the same situation that I was in.</p>
        <p>To correct any out of date information please <a className="inverse-anchor" href="mailto:info@mail.seattledesign.info">notify me</a> about any changes that should be made.</p>
      </div>
    )
  }
}

export default About;
