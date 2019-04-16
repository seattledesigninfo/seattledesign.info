import React from "react";
import Checkbox from "./Checkbox";

const { ga } = window;

class CompanyFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      focus: {
        All: true,
        Advertising: false,
        Branding: false,
        "Digital Product": false,
        Interactive: false,
        Environmental: false,
        Exhibition: false,
        "Mobile Development": false,
        Motion: false,
        Packaging: false,
        Print: false,
        Strategy: false,
        Video: false
      },
      size: {
        "1-10": true, // Micro
        "11-50": true, // Small
        "51-200": true, // Medium
        "201-500": true, // Large
        "501+": true // Massive
      }
    };

    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const focuses = { ...nextProps.focuses };

    if (JSON.stringify(focuses) === JSON.stringify(this.props.focuses)) {
      return false;
    }

    this.setState({ focuses });
  }

  handleFocusChange(event) {
    const name = event.target.name;
    const changedState = { ...this.state };

    ga("send", {
      hitType: "event",
      eventCategory: "Filter Companies",
      eventAction: "Focuses",
      eventLabel: event.target.name
    });

    if (event.target.checked) {
      changedState[name][event.target.value] = true;

      if (event.target.value === "All") {
        Object.keys(changedState[name]).map(
          value => (changedState[name][value] = false)
        );
        changedState[name]["All"] = true;
      } else {
        changedState[name]["All"] = false;
      }
    } else {
      changedState[name][event.target.value] = false;
    }

    if (
      event.target.form.querySelectorAll("input[type=checkbox]:checked")
        .length === 0
    ) {
      changedState[name]["All"] = true;
    }

    this.setState(changedState);
    this.props.filterCompanies(this.state);
  }

  handleSizeChange(event) {
    const name = event.target.name;
    const changedState = { ...this.state };

    ga("send", {
      hitType: "event",
      eventCategory: "Filter Companies",
      eventAction: "Sizes",
      eventLabel: event.target.name
    });

    if (event.target.checked) {
      changedState[name][event.target.value] = true;
    } else {
      changedState[name][event.target.value] = false;
    }

    this.setState(changedState);
    this.props.filterCompanies(this.state);
  }

  render() {
    return (
      <section className="companies-filter">
        <form
          className="companies-filter__form companies-filter--focus"
          onChange={this.handleFocusChange}
        >
          <h6>Services</h6>
          {Object.keys(this.state.focus).map((focus, index) => (
            <Checkbox
              index={index}
              focuses={this.state.focus}
              focus={focus}
              type="focus"
            />
          ))}
        </form>

        <form
          className="companies-filter__form companies-filter--size"
          onChange={this.handleSizeChange}
        >
          <h6>Size</h6>
          {Object.keys(this.state.size).map((size, index) => (
            <Checkbox
              index={index}
              focuses={this.state.size}
              focus={size}
              type="size"
            />
          ))}
        </form>
      </section>
    );
  }
}

export default CompanyFilter;
