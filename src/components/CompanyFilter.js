import React from 'react';

class CompanyFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      focuses: {
        "All": true,
        "Advertising": false,
        "Branding": false,
        "Digital Product Design": false,
        "Interactive": false,
        "Exhibition Design": false,
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

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const focuses = {...nextProps.focuses};

    if (JSON.stringify(focuses) === JSON.stringify(this.props.focuses)) {
      return false;
    }

    this.setState({ focuses });
  }

  handleChange(event) {
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

    this.setState(changedState);
    this.props.filterCompanies(this.state);
  }

  render() {
    return(
      <div>
        <form onChange={this.handleChange}>
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
                      <span className={`company-service ${focus}`}>{focus}</span>
                    </label>
                  </li>
                )
            })
          }
          </ul>

          <h3>Size</h3>

          <ul>
          {
            Object
              .keys(this.state.sizes)
              .map(size => {
              return (
                <li key={size}>
                  <label className={`checked-${this.state.sizes[size]}`} key={size}>
                    <input name="sizes" type="checkbox" defaultChecked={this.state.sizes[size]} value={size} />
                    {size}
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
