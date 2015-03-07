var React = require('react');

var RouteStore = require('../stores/RouteStore');
var AperioActions = require('../actions/AperioActions');
var AperioConstants = require('../constants/AperioConstants');
var AperioApi = require('../AperioApi');
var Routing = require('../mixins/Routing');

var Timeline = require('./Timeline.react');
var Join = require('./Join.react');
var Header = require('./Header.react');

var AperioApp = React.createClass({
  mixins: [Routing],

  handleRouteChange: function(newUrl, fromHistory) {
    AperioActions.changeUrl(newUrl, fromHistory);
  },

  getInitialState: function() {
    return {
      view: null,
      params: null
    };
  },

  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
    AperioApi.loadUser()
    this.handleRouteChange(this.getCurrentUrl(), false);
  },

  _onChange: function() {
    this.setState(RouteStore.getCurrentView());
  },

  componentWillUnmount: function() {
    RouteStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var currentView = [ ];

    switch(this.state.view) {
      case AperioConstants.TIMELINE_VIEW:
        currentView.push(<Timeline />);
        break;
      case AperioConstants.JOIN_VIEW:
        currentView.push(<Join active="register"/>);
        break;
      default:
        currentView.push(<div> View not found </div>);
    }

    return (
      <div>
        <Header />
        <div className="container-fluid">
          {currentView}
        </div>
      </div>
    )
  }
});

module.exports = AperioApp;
