var React = require('react');
var ReactPropTypes = React.PropTypes;
var Link = require('react-router').Link;

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActionCreators')

var Header = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.getUser()
    };
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

  _logout: function(event) {
    event.preventDefault();
    UserActions.logout();
  },

  render: function() {
    var currentUserItems = [ ];

    if (this.state.user != null) {
      currentUserItems.push(
        <li>
          <Link to="organization" params={{id: "new"}}>
            New Organization
          </Link>
        </li>
      );
      currentUserItems.push(
        <li>
          <Link to="profile"> {this.state.user.name} </Link>
        </li>
      );
      currentUserItems.push(
        <li> <a href="#" onClick={this._logout}> Logout </a> </li>
      );
    }
    else {
      currentUserItems.push(<li> <Link to="join"> Join / Login </Link> </li>);
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">aperio</a>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <form className="navbar-form" role="search">
                <div className="form-group">
                  <input
                    type="text" className="form-control"
                    placeholder="Search Organizations"
                  />
                </div>
              </form>
            </li>
            <li> <Link to="home"> Home </Link> </li>
          </ul>
          <ul className="nav navbar-nav navbar-right"> {currentUserItems} </ul>
        </div>
      </nav>
    );
  },

});

module.exports = Header;
