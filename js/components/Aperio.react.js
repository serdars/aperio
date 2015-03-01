var React = require('react');
var cx = require('react/lib/cx');

var AperioStore = require('../stores/AperioStore');
var AperioApi = require('../AperioApi');

var TimelineFilters = require('./TimelineFilters.react');
var Timeline = require('./Timeline.react');
var Footer = require('./Footer.react');
var Header = require('./Header.react');

var AperioApp = React.createClass({
  getInitialState: function() {
    return {
      currentUser: AperioStore.getCurrentUser()
    };
  },

  componentDidMount: function() {
    AperioStore.addChangeListener(this._onChange);
    AperioApi.loadUser();
  },

  componentWillUnmount: function() {
    AperioStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-offset-1 col-md-7">
            <Timeline />
          </div>
          <div className="col-md-3">
            <TimelineFilters user={this.state.currentUser} onFilter={this._onFilter}/>
          </div>
        </div>
      </div>
    )
  },

  _onFilter: function(filters) {
    console.log("Filters: " + filters.filteredBy + filters.filterOrg)
  },

  _onChange: function() {
    this.setState({
      currentUser: AperioStore.getCurrentUser(),
      timeline: AperioStore.getCurrentTimeline()
    });
  }

});

module.exports = AperioApp;
