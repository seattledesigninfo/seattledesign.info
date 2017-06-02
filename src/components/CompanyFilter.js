import React from 'react';

class CompanyFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      focuses: {
        "Advertising": true,
        "Branding": true,
        "Digital Product Design": true,
        "Interactive": true,
        "Exhibition Design": true,
        "Mobile Development": true,
        "Print": true,
        "Strategy": true,
        "Video": true
      },
      sizes: {
        "1-10": true, // Micro
        "11-50": true, // Small
        "51-200": true, // Medium
        "201-500": true, // Large
        "501-1000": true, // Massive
        "1001-5000": true,
        "5001-10000": true
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const changedState = {...this.state};

    if (event.target.checked) {
      changedState[name][event.target.value] = true;

      if (event.target.value === "All") {
        Object.keys(changedState[name])
          .map(value => changedState[name][value] = true);
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
              .map(focus => {
                return (
                  <li key={focus}>
                    <label className={`checked-${this.state.focuses[focus]}`} key={focus}>
                      <input name="focuses" type="checkbox" defaultChecked={this.state.focuses[focus]} value={focus} />
                      {focus}
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
