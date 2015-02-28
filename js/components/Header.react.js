var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');
var AperioTextInput = require('./AperioTextInput.react');

var Header = React.createClass({
  propTypes: {
    currentUser: ReactPropTypes.object.isRequired
  },

  render: function() {
    var currentUser = this.props.currentUser;

    return (
      <header id="header">
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Aperio</a>
            </div>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <p class="navbar-text">Signed in as {currentUser.username}</p>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  },

});

module.exports = Header;
