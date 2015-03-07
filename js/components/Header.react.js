var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioStore = require('../stores/AperioStore');
var AperioApi = require('../AperioApi');

var Header = React.createClass({
  getInitialState: function() {
    return {
      user: AperioStore.getCurrentUser()
    };
  },

  componentDidMount: function() {
    AperioStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AperioStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      user: AperioStore.getCurrentUser()
    });
  },

  _logout: function(event) {
    event.preventDefault();
    AperioApi.logout();
  },

  render: function() {
    var currentUserItems = [ ];

    if (this.state.user != null) {
      currentUserItems.push(<li> <a href="#"> {this.state.user.name} </a> </li>);
      currentUserItems.push(<li> <a href="#" onClick={this._logout}> Logout </a> </li>);
    }
    else {
      currentUserItems.push(<li> <a href="#/join"> Join / Login </a> </li>);
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
            <li> <a href="#/timeline"> Timeline </a> </li>
          </ul>
          <ul className="nav navbar-nav navbar-right"> {currentUserItems} </ul>
        </div>
      </nav>
    );
  },

});

module.exports = Header;
