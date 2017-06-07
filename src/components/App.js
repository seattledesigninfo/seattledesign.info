import React from 'react';
import '../styles.css';

import { load } from '../spreadsheet';

import CompanyFilter from './CompanyFilter';
import Company from './Company';
import About from './About';
import Navigation from './Navigation';

class App extends React.Component {
  constructor() {
    super();

    this.filterCompanies = this.filterCompanies.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      companies: [],
      displayCompanies: [],
      showAbout: false,
    }
  }

  componentWillMount() {
    load(this.onLoad.bind(this));
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  onLoad(data, error) {
    if (data) {
      this.setState({
        ...data
      });
    } else {
      this.setState({
        error: error
      });
    }
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
        <Navigation toggleAbout={this.toggleAbout} />
        <div className="container">
          <section className="column company-filter">
            <CompanyFilter focuses={this.state.focuses} filterCompanies={this.filterCompanies} />
          </section>
          <section className="column companies">
            <div className="list-of-companies">
              <div className="company header">
                <div className="company-name">Name</div>
                <div className="company-name">Focuses</div>
                <div className="company-size">Size</div>
              </div>

              {
                this.state.displayCompanies
                  .map((company, index) => {
                    return(
                      <Company
                        key={index}
                        details={company} />
                      )
                  })
              }
            </div>
          </section>
        </div>
        <About toggleAbout={this.toggleAbout} />
      </div>
    )
  }
}

export default App;
