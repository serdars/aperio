var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var AperioStore = require('../stores/AperioStore');
var TimelineFilters = require('./TimelineFilters.react');

var AperioApp = React.createClass({

  getInitialState: function() {
    return {
      currentUser: AperioStore.getCurrentUser()
    };
  },

  componentDidMount: function() {
    AperioStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AperioStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <TimelineFilters user={this.state.currentUser} onFilter={this._onFilter}/>
    )
  },

  _onFilter: function(filters) {
    console.log("Filters: " + filters.filteredBy + filters.filterOrg)
  },

  _onChange: function() {
    this.setState(getAperioState());
  }

});

module.exports = AperioApp;
