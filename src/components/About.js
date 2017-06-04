import React from 'react';

class About extends React.Component {
  render() {
    return(
      <div className="about">
        <div className="close-about">
          <a href="#" onClick={this.props.toggleAbout}>&times;</a>
        </div>
        <p><strong>Seattle Design</strong> is the result of months of research to uncover the thriving Seattle graphic and interactive design community. This is a work in progress, but my hope is that it helps students, city transplants, hiring managers, and those looking for a job.</p>
        <p><strong>Seattle Design</strong> grew out of a frustration while researching the Seattle Design scene. Information online was almost always out-of-date or undiscoverable. Companies I knew existed were nearly impossible to find through LinkedIn and Google queries. I had to believe other people had a similar kind of frustration.</p>
        <p>This is a labor of love, so please help me out to correct any information by <a className="inverse-anchor" href="mailto:info@mail.seattledesign.info">notifying me</a> of changes that should be made.</p>
      </div>
    )
  }
}

export default About;
