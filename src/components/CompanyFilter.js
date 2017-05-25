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
        "Video": true,
        "Web Development": true,
      },
      sizes: {
        "1-10": true,
        "11-50": true,
        "51-200": true,
        "201-500": true,
        "501-1000": true,
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
          {
            Object
              .keys(this.state.focuses)
              .map(focus => {
                return (
                  <label className={`checked-${this.state.focuses[focus]}`} key={focus}>
                    <input name="focuses" type="checkbox" defaultChecked={this.state.focuses[focus]} value={focus} />
                    {focus}
                  </label>
                )
            })
          }

          <h3>Size</h3>

          {
            Object
              .keys(this.state.sizes)
              .map(size => {
              return (
                <label className={`checked-${this.state.sizes[size]}`} key={size}> {size}
                  <input name="sizes" type="checkbox" defaultChecked={this.state.sizes[size]} value={size} />
                </label>
              )
            })
          }
        </form>
      </div>
    )
  }
}

export default CompanyFilter;
