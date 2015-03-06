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
    return { };
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-offset-1 col-md-7">
              <Timeline />
            </div>
            <div className="col-md-3">
              <TimelineFilters onFilter={this._onFilter}/>
            </div>
          </div>
        </div>
      </div>
    )
  },

  _onFilter: function(filters) {
    console.log("Filtered!")
  },

  _onChange: function() {
    // Nothing to do for now.
  }

});

module.exports = AperioApp;
