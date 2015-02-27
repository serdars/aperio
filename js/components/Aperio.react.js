var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var AperioStore = require('../stores/AperioStore');

function getAperioState() {
  return {
    allOrganizations: AperioStore.getAllOrganizations()
  };
}

var AperioApp = React.createClass({

  getInitialState: function() {
    return getAperioState();
  },

  componentDidMount: function() {
    AperioStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AperioStore.removeChangeListener(this._onChange);
  },

  render: function() {
  	return (
      <div>
        <Header />
        <MainSection
          allOrganizations={this.state.allOrganizations}
        />
        <Footer allOrganizations={this.state.allOrganizations} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the AperioStore
   */
  _onChange: function() {
    this.setState(getAperioState());
  }

});

module.exports = AperioApp;
