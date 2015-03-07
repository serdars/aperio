var React = require('react');

var RouteStore = require('../stores/RouteStore');
var AperioActions = require('../actions/AperioActions');
var AperioConstants = require('../constants/AperioConstants');
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
      view: null
    };
  },

  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
    this.handleRouteChange(this.getCurrentUrl(), false);
  },

  _onChange: function() {
    this.setState({
      view: RouteStore.getCurrentView()
    });
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
        currentView.push(<Join />);
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
