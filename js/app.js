var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header = require('./components/Header.react');
var Join = require('./components/Join.react');
var Organization = require('./components/Organization.react');
var Profile = require('./components/Profile.react');
var OrgInvites = require('./components/OrgInvites.react');
var OrgTimeline = require('./components/OrgTimeline.react');
var OrgConstruction = require('./components/OrgConstruction.react');
var Home = require('./components/Home.react');


var AppActions = require('./actions/AppActionCreators');
var UserStore = require('./stores/UserStore');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="join" handler={Join}/>
    <Route name="home" handler={Home}/>
    <Route name="organization" path="organizations/:id" handler={Organization}>
      <Route name="timeline" handler={OrgTimeline} />
      <Route name="conversations" handler={OrgConstruction} />
      <Route name="members" handler={OrgConstruction} />
      <Route name="invites" handler={OrgInvites} />
      <DefaultRoute handler={OrgTimeline}/>
    </Route>
    <Route name="profile" handler={Profile}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

function _initApp() {
  // Startup the Router
  Router.run(routes, function (Handler) {
    React.render(
      <Handler/>,
      document.body
    );
  });

  UserStore.removeChangeListener(_initApp);
}

UserStore.addChangeListener(_initApp);

// Kick off the initialization
AppActions.init();
