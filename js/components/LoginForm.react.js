var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioApi = require('../AperioApi');

var AperioTextInput = require('./AperioTextInput.react');

var LoginForm = React.createClass({
  propTypes: {
    onSubmit: ReactPropTypes.func
  },

  _onSubmit: function(e) {
    e.preventDefault();

    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    // TODO: Validation

    this.props.onSubmit({
      username: username, password: password
    });
  },

  render: function() {
  	return (
      <form onSubmit={this._onSubmit}>
        <div className="form-group">
          <AperioTextInput
            type="text" className="form-control"
            id="username" placeholder="Username"
            ref="username"
          />
        </div>
        <div className="form-group">
          <AperioTextInput
            type="password" className="form-control"
            id="password" placeholder="Password"
            ref="password"
          />
        </div>
        <button type="submit" className="btn btn-primary center-block">
          Login
        </button>
      </form>
    );
  },

});

module.exports = LoginForm;
