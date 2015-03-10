var React = require('react');

var RouteStore = require('../stores/RouteStore');
var AperioActions = require('../AperioActions');
var AperioConstants = require('../AperioConstants');
var Routing = require('../mixins/Routing');

var Timeline = require('./Timeline.react');
var Join = require('./Join.react');
var Header = require('./Header.react');
var Organization = require('./Organization.react');

var AperioApp = React.createClass({
  mixins: [Routing],

  handleRouteChange: function(href, fromHistory) {
    AperioActions.navigateTo(href, fromHistory);
  },

  getInitialState: function() {
    return {
      view: null,
      params: null
    };
  },

  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
    AperioActions.loadFromServer(AperioConstants.ITEM_TYPE_CURRENT_USER, null);
    this.handleRouteChange(this.getCurrentUrl(), false);
  },

  _onChange: function() {
    var currentView = RouteStore.getCurrentView();
    this.setState(currentView);
  },

  componentWillUnmount: function() {
    RouteStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var currentView = [ ];

    switch(this.state.view) {
      case AperioConstants.VIEW_TIMELINE:
        currentView.push(<Timeline />);
        break;
      case AperioConstants.VIEW_JOIN:
        currentView.push(<Join active="register"/>);
        break;
      case AperioConstants.VIEW_ORGANIZATION:
        currentView.push(<Organization id={this.state.params.id}/>);
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
