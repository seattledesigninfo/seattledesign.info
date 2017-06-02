import React from 'react';
import '../styles.css';
import Companies from '../companies';

import CompanyFilter from './CompanyFilter';
import Company from './Company';
import About from './About';

class App extends React.Component {
  constructor() {
    super();

    this.filterCompanies = this.filterCompanies.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      companies: [],
      displayCompanies: [],
      activeCompany: null,
      showAbout: false,
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    this.setState({
      companies: Companies,
      displayCompanies: Companies
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === 27) {
      this.setState({
        showAbout: false
      });
    }
  }

  toggleAbout() {
    const showAbout = !this.state.showAbout;

    this.setState({
      showAbout: showAbout
    })
  }

  filterCompanies(filters) {
    const companies = [...this.state.companies];
    const { focuses, sizes } = filters;

    const filterFocuses = Object
      .keys(focuses)
      .filter(key => focuses[key]);

    const filterSizes = Object
      .keys(sizes)
      .filter(key => sizes[key]);

    const filteredCompanies = companies
      .filter((company, index) => {
        return filterFocuses.some((service) => company.services.indexOf(service) > -1);
      })
      .filter((company, index) => {
        return filterSizes.some((size) => company.size === size);
      });

    return this.setState({
      displayCompanies: filteredCompanies
    });
  }

  render() {
    return (
      <div className={`about-show-${this.state.showAbout}`}>
        <nav className="navigation">
          <ul>
            <li className="navigation-item"><strong>Seattle Design List</strong></li>
            <li className="navigation-item"><a href="#" onClick={this.toggleAbout}>What is this?</a></li>
          </ul>
        </nav>
        <div className="container">
          <section className="column company-filter">
            <CompanyFilter focuses={this.state.focuses} filterCompanies={this.filterCompanies} />
          </section>
          <section className="column companies">
            <ul className="list-of-companies">
              <li className="company header">
                <div className="company-name">Name</div>
                <div className="company-name">Focuses</div>
                <div className="company-size">Size</div>
              </li>

              {
                this.state.displayCompanies
                  .map((company, index) => {
                    return(
                      <Company
                        active={this.state.activeCompany === company.name}
                        key={index}
                        details={company} />
                      )
                  })
              }
            </ul>
          </section>
        </div>
        <About toggleAbout={this.toggleAbout} />
      </div>
    )
  }
}

export default App;
