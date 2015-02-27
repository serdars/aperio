var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');
var Organization = require('./Organization.react');

var MainSection = React.createClass({

  propTypes: {
    allOrganizations: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are organizations.
    if (Object.keys(this.props.allOrganizations).length < 1) {
      return null;
    }

    var allOrganizations = this.props.allOrganizations;
    var organizations = [];

    for (var key in allOrganizations) {
      organizations.push(<Organization key={key} organization={allOrganizations[key]} />);
    }

    return (
      <section id="main">
        <ul id="organization-list">{organizations}</ul>
      </section>
    );
  },

});

module.exports = MainSection;
