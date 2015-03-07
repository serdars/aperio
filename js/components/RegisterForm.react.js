var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioApi = require('../AperioApi');

var AperioTextInput = require('./AperioTextInput.react');

var RegisterForm = React.createClass({
  propTypes: {
    onSubmit: ReactPropTypes.func
  },

  _onSubmit: function(e) {
    e.preventDefault();

    var username = this.refs.username.getDOMNode().value.trim();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    var password_confirmation = this.refs.password_confirmation.getDOMNode().value.trim();

    // TODO: Validation

    this.props.onSubmit({
      username: username, email: email, password: password,
      password_confirmation: password_confirmation
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
            type="email" className="form-control"
            id="email" placeholder="Email"
            ref="email"
          />
        </div>
        <div className="form-group">
          <AperioTextInput
            type="password" className="form-control"
            id="password" placeholder="Password"
            ref="password"
          />
        </div>
        <div className="form-group">
          <AperioTextInput
            type="password" className="form-control"
            id="password_confirmation"
            placeholder="Confirm Password"
            ref="password_confirmation"
          />
        </div>
        <button type="submit" className="btn btn-primary center-block">
          Register
        </button>
      </form>
    );
  },

});

module.exports = RegisterForm;
