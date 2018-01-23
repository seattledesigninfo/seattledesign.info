import React from "react";
import "../styles.css";

import { load } from "../spreadsheet";

import CompanyFilter from "./CompanyFilter";
import Company from "./Company";
import About from "./About";
import Navigation from "./Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.filterCompanies = this.filterCompanies.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      companies: [],
      displayCompanies: [],
      showAbout: false,
      focuses: {
        All: true,
        Advertising: false,
        Branding: false,
        "Digital Product": false,
        Environmental: false,
        Exhibition: false,
        Interactive: false,
        "Mobile Development": false,
        Packaging: false,
        Print: false,
        Strategy: false,
        Video: false,
        UX: false
      },
      sizes: {
        "1-10": true, // Micro
        "11-50": true, // Small
        "51-200": true, // Medium
        "201-500": true, // Large
        "501+": true // Massive
      }
    };
  }

  componentDidMount() {
    load(this.onLoad.bind(this));

    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentDidUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
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
    });
  }

  filterCompanies(filters) {
    const { companies } = this.state;
    const { focuses, sizes } = filters;

    const filterFocuses = Object.keys(focuses).filter(key => focuses[key]);
    const filterSizes = Object.keys(sizes).filter(key => sizes[key]);

    const filterCompaniesByEveryFocus = (company, index) =>
      filterFocuses.every(service => company.services.indexOf(service) > -1);

    const filterCompaniesBySize = (company, index) =>
      filterSizes.some(size => company.size === size);

    let filteredCompanies = companies.filter(filterCompaniesBySize);

    if (focuses["All"] !== true) {
      filteredCompanies = filteredCompanies.filter(filterCompaniesByEveryFocus);
    }

    return this.setState({
      focuses,
      displayCompanies: filteredCompanies
    });
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
              filterCompanies={this.filterCompanies}
            />
          </section>
          <section className="companies">
            <div className="list-of-companies">
              <div className="company company--header">
                <div className="company--cell company-name">
                  <h2>Name</h2>
                </div>
                <div className="company--cell company-focuses">
                  <h2>Focuses</h2>
                </div>
                <div className="company--cell company-size">
                  <h2>Size</h2>
                </div>
              </div>

              {this.state.displayCompanies.map((company, index) => {
                return (
                  <Company
                    key={index}
                    details={company}
                    focuses={this.state.focuses}
                  />
                );
              })}
            </div>
          </section>
        </div>
        <About toggleAbout={this.toggleAbout} />
      </div>
    );
  }
}

export default App;
