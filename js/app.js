var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header = require('./components/Header.react');
var Join = require('./components/Join.react');
var OrgHandler = require('./components/OrgHandler.react');

var AppActions = require('./actions/AppActionCreators');
var UserStore = require('./stores/UserStore');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

// <Route name="events" handler={Timeline}/>
// <DefaultRoute handler={Timeline}/>
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="join" handler={Join}/>
    <Route name="organization" path="organizations/:id"
      handler={OrgHandler}
    />
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
