var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');

var Footer = React.createClass({

  propTypes: {
    allOrganizations: ReactPropTypes.object.isRequired
  },

  render: function() {
    var allOrganizations = this.props.allOrganizations;
    var total = Object.keys(allOrganizations).length;

    if (total === 0) {
      return null;
    }

  	return (
      <footer id="footer">
        <span id="organization-count">
          <strong>
            {total}
          </strong>
          {" organizations in total"}
        </span>
      </footer>
    );
  },

});

module.exports = Footer;
