var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');

var Footer = React.createClass({

  render: function() {
  	return (
      <footer id="footer">
        <span id="feedback">
          {"Feedback: serdar@aperioapp.com"}
        </span>
      </footer>
    );
  },

});

module.exports = Footer;
