import React from 'react';
import '../styles.css';
import Companies from '../companies';

import CompanyFilter from './CompanyFilter';
import Company from './Company';
import Details from './Details';
import Information from './Information';
import Guide from './Guide';

class App extends React.Component {
  constructor() {
    super();

    this.filterCompanies = this.filterCompanies.bind(this);
    this.showDetails = this.showDetails.bind(this);

    this.state = {
      companies: {},
      displayCompanies: {},
      details: {},
      activeCompany: null,
      information: false,
    }
  }

  componentWillMount() {
    this.setState({
      companies: Companies,
      displayCompanies: Companies
    });
  }

  showDetails(company) {
    // const details = {...this.state.details};
    this.setState({ details: company, activeCompany: company.name });
  }

  filterCompanies(filters) {
    const companies = {...this.state.companies};
    const { focuses, sizes, tags } = filters;

    const filterFocuses = Object
      .keys(focuses)
      .filter(key => focuses[key]);

    const filterSizes = Object
      .keys(sizes)
      .filter(key => sizes[key]);

    const filteredCompanies = Object
      .keys(companies)
      .filter((key) => {
        return filterFocuses.some((service) => {
          return companies[key].services.indexOf(service) > -1;
        });
      })
      .filter((key) => {
        return filterSizes.some((size) => {
          return companies[key].size === size;
        });
      })
      .reduce((object, key) => {
        object[key] = companies[key];
        return object;
      }, {});

    return this.setState({ displayCompanies: filteredCompanies });
  }

  render() {
    return (
      <div>
        <section className="column company-filter">
          <CompanyFilter focuses={this.state.focuses} filterCompanies={this.filterCompanies} />
        </section>
        <section className="column companies">
          <h1>Companies: {Object.keys(this.state.displayCompanies).length}</h1>
          <ul className="list-of-companies">
            {
              Object
                .keys(this.state.displayCompanies)
                .map(key => {
                  return(
                    <Company
                      active={this.state.activeCompany === this.state.companies[key].name}
                      key={key}
                      showDetails={this.showDetails}
                      details={this.state.companies[key]} />
                    )
                })
            }
          </ul>
        </section>
        <section className="map">
          <Guide />
          <section className="company-details">
            <Details details={this.state.details} />
          </section>
        </section>
      </div>
    )
  }
}

export default App;
