var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActionCreators')
var TimelineItems = require('./TimelineItems.react');

var Home = React.createClass({
  mixins: [Navigation],

  statics: {
    willTransitionTo: function(transition, params) {
      UserActions.timeline();
    }
  },

  getInitialState: function() {
    return {
      user: UserStore.getUser()
    }
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      user: UserStore.getUser()
    });
  },

  _onJoin: function() {
    this.transitionTo("join")
  },

  _onCreateOrg: function(event) {
    event.preventDefault();
    this.transitionTo("organization", {id: "new"})
  },

  renderOrgsView: function() {
    var views = [ ];

    if (this.state.user == null) {
      views.push(
        <li className="list-group-item">
          <button type="button" className="btn btn-default btn-block"
            onClick={this._onJoin}
          >
            Join / Login
          </button>
        </li>
      );
    } else {
      var orgs = this.state.user.organizations;

      if (orgs.length == 0) {
        views.push(
          <a href="#" className="list-group-item disabled">
            You do not have any organizations!
          </a>
        );
      } else {

        for(var i=0; i < orgs.length; i++) {
          views.push(
            <Link to="organization" params={{id: orgs[i].id}} className="list-group-item">
              {orgs[i].name}
            </Link>
          );
        }
      }

      views.push(
        <div className="list-group-item">
          <button type="button" className="btn btn-primary btn-block"
            onClick={this._onCreateOrg}
          >
            Create Organization
          </button>
        </div>
      );
    }

    return (
      <div className="panel panel-primary">
        <div className="panel-heading"> Your Organizations </div>
        <div className="list-group">
          {views}
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-1 col-sm-10">
          <div className="row">
            <div className="col-sm-8">
              <TimelineItems />
            </div>
            <div className="col-sm-4">
              {this.renderOrgsView()}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Home;
