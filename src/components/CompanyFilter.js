import React from 'react';
import { slugify } from '../helpers';

class CompanyFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      focuses: {
        "All": true,
        "Advertising": false,
        "Branding": false,
        "Digital Product": false,
        "Interactive": false,
        "Environmental": false,
        "Exhibition": false,
        "Mobile Development": false,
        "Motion": false,
        "Packaging": false,
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

    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const focuses = {...nextProps.focuses};

    if (JSON.stringify(focuses) === JSON.stringify(this.props.focuses)) {
      return false;
    }

    this.setState({ focuses });
  }

  handleFocusChange(event) {
    const name = event.target.name;
    const changedState = {...this.state};

    if (event.target.checked) {
      changedState[name][event.target.value] = true;

      if (event.target.value === "All") {
        Object.keys(changedState[name])
          .map(value => changedState[name][value] = false);
        changedState[name]["All"] = true;
      } else {
        changedState[name]["All"] = false;
      }
    } else {
      changedState[name][event.target.value] = false;
    }

    if (event.target.form.querySelectorAll("input[type=checkbox]:checked").length === 0) {
      changedState[name]["All"] = true;
    }

    this.setState(changedState);
    this.props.filterCompanies(this.state);
  }

  handleSizeChange(event) {
    const name = event.target.name;
    const changedState = {...this.state};

    if (event.target.checked) {
      changedState[name][event.target.value] = true;
    } else {
      changedState[name][event.target.value] = false;
    }

    this.setState(changedState);
    this.props.filterCompanies(this.state);
  }

  render() {
    return(
      <div>
        <form onChange={this.handleFocusChange}>
          <ul>
          {
            Object
              .keys(this.state.focuses)
              .map((focus, index) => {
                return (
                  <li key={focus}>
                    <div className="checkbox" data-id={this.state.focuses[focus]}>
                      <div className="checkbox--checkbox">
                        <input name="focuses" type="checkbox" id={`focus-${index}`} checked={this.state.focuses[focus]} readOnly value={focus} />
                        <label htmlFor={`focus-${index}`} key={focus}></label>
                      </div>
                    </div>
                    <label htmlFor={`focus-${index}`} className={`checked-${this.state.focuses[focus]}`} key={focus}>
                      <span className={`company-service ${slugify(focus)}`}>{focus}</span>
                    </label>
                  </li>
                )
            })
          }
          </ul>
        </form>

        <form onChange={this.handleSizeChange}>
          <h3>Size</h3>

          <ul>
          {
            Object
              .keys(this.state.sizes)
              .map((size, index) => {
              return (
                <li key={size}>
                  <div className="checkbox" data-id={this.state.sizes[size]}>
                    <div className="checkbox--checkbox">
                      <input name="sizes" type="checkbox" id={`size-${index}`} checked={this.state.sizes[size]} readOnly value={size} />
                      <label htmlFor={`size-${index}`} key={size}></label>
                    </div>
                  </div>
                  <label htmlFor={`size-${index}`} className={`checked-${this.state.sizes[size]}`} key={size}>
                    <span className={`company-service ${size}`}>{size}</span>
                  </label>
                </li>
              )
            })
          }
          </ul>
        </form>
      </div>
    )
  }
}

export default CompanyFilter;
