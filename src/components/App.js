import React from 'react';
import '../styles.css';

import { allCompanies, load } from '../spreadsheet';

import CompanyFilter from './CompanyFilter';
import Company from './Company';
import About from './About';
import Navigation from './Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.filterCompanies = this.filterCompanies.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.filterExclusive = this.filterExclusive.bind(this);

    this.state = {
      companies: [],
      displayCompanies: [],
      showAbout: false,
      focuses: {
        "All": true,
        "Advertising": false,
        "Branding": false,
        "Digital Product Design": false,
        "Exhibition Design": false,
        "Interactive": false,
        "Mobile Development": false,
        "Print": false,
        "Strategy": false,
        "Video": false
      },
      sizes: {
        "1-10": true, // Micro
        "11-50": true, // Small
        "51-200": true, // Medium
        "201-500": true, // Large
        "501+": true // Massive
      }
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

    this.setState({ focuses, sizes });

    // if (focuses)

    if (focuses["All"] === true) {
      return this.setState({
        displayCompanies: allCompanies
      });
    };

    debugger;

    const filterFocuses = Object
      .keys(focuses)
      .filter(key => focuses[key]);

    const filterSizes = Object
      .keys(sizes)
      .filter(key => sizes[key]);

    const filteredCompanies = companies
      .filter((company, index) => {
        return filterFocuses.every((service) => company.services.indexOf(service) > -1);
      })
      .filter((company, index) => {
        return filterSizes.some((size) => company.size === size);
      });

    return this.setState({
      displayCompanies: filteredCompanies
    });
  }

  filterExclusive(service) {
    const focuses = {...this.state.focuses};
    const sizes = {...this.state.sizes};

    Object.keys(focuses).map((focus, index) => {
      if (focus === service) {
        focuses[focus] = true;
      } else {
        focuses[focus] = false;
      }
    });

    this.filterCompanies({ focuses, sizes });
  }

  render() {
    return (
      <div className={`about-show-${this.state.showAbout}`}>
        <Navigation toggleAbout={this.toggleAbout} />
        <div className="container">
          <section className="company-filter">
            <CompanyFilter
              focuses={this.state.focuses}
              sizes={this.state.sizes}
              filterCompanies={this.filterCompanies} />
          </section>
          <section className="column companies">
            <div className="list-of-companies">
              <div className="company company--header">
                <div className="company--cell company-name">Name</div>
                <div className="company--cell company-focuses">Focuses</div>
                <div className="company--cell company-size">Size</div>
              </div>

              {
                this.state.displayCompanies
                  .map((company, index) => {
                    return(
                      <Company
                        key={index}
                        details={company}
                        filterExclusive={this.filterExclusive} />
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
