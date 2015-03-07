var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioApi = require('../AperioApi');

var RegisterForm = require('./RegisterForm.react');
var LoginForm = require('./LoginForm.react');

var Join = React.createClass({
  _registerSubmit: function(data) {
    console.log("Registering:" + data)
  },

  _loginSubmit: function(data) {
    console.log("Logging in:" + data)
  },

  render: function() {
  	return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-4">
          <RegisterForm onSubmit={this._registerSubmit} />
        </div>
        <div className="col-sm-4">
          <LoginForm onSubmit={this._loginSubmit} />
        </div>
      </div>
    );
  },

});

module.exports = Join;
