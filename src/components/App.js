import React, { Fragment } from "react";
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

    this.state = {
      companies: [],
      displayCompanies: [],
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

  filterCompanies(filters) {
    const { companies } = this.state;
    const { focus, size } = filters;

    const filterFocuses = Object.keys(focus).filter(key => focus[key]);
    const filterSizes = Object.keys(size).filter(key => size[key]);

    const filterCompaniesByEveryFocus = company =>
      filterFocuses.every(service => company.services.indexOf(service) > -1);

    const filterCompaniesBySize = company =>
      filterSizes.some(size => company.size === size);

    let filteredCompanies = companies.filter(filterCompaniesBySize);

    if (focus["All"] !== true) {
      filteredCompanies = filteredCompanies.filter(filterCompaniesByEveryFocus);
    }

    return this.setState({
      focus,
      displayCompanies: filteredCompanies
    });
  }

  render() {
    return (
      <Fragment>
        <Navigation toggleAbout={this.toggleAbout} />
        <CompanyFilter
          focuses={this.state.focuses}
          sizes={this.state.sizes}
          filterCompanies={this.filterCompanies}
        />
        <section className="companies">
          {this.state.displayCompanies.map((company, index) => {
            return (
              <Company
                key={index}
                company={company}
                focuses={this.state.focuses}
              />
            );
          })}
        </section>
        <About />
      </Fragment>
    );
  }
}

export default App;
