var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var AperioApi = require('../AperioApi');
var AperioStore = require('../stores/AperioStore');
var AperioActions = require('../actions/AperioActions');

var RegisterForm = require('./RegisterForm.react');
var LoginForm = require('./LoginForm.react');

var Join = React.createClass({
  propTypes: {
    active: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      active: this.props.active
    }
  },

  _onSubmit: function(data) {
    if (this.state.active == "register") {
      AperioApi.register(data);
    } else {
      AperioApi.login(data);
    }
  },

  _register: function() {
    this.setState({
      active: "register"
    });
  },

  _login: function() {
    this.setState({
      active: "login"
    });
  },

  render: function() {
    if (AperioStore.getCurrentUser() != null) {
      AperioActions.changeUrl("#/timeline", true);
    }

    var form;

    if (this.state.active == "register") {
      form = <RegisterForm onSubmit={this._onSubmit} />
    } else {
      form = <LoginForm onSubmit={this._onSubmit} />
    }

  	return (
      <div className="row">
        <div className="col-sm-offset-4 col-sm-4">
          <div className="btn-group btn-group-justified join-selection-btns"
            role="group" aria-label="selection"
          >
            <div className="btn-group" role="group">
              <button type="button" className={cx({
                "btn": true,
                "btn-default": !(this.state.active == "register"),
                "btn-primary": (this.state.active == "register")
              })} onClick={this._register}>
                Register
              </button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className={cx({
                "btn": true,
                "btn-default": !(this.state.active == "login"),
                "btn-primary": (this.state.active == "login")
              })} onClick={this._login}>
                Login
              </button>
            </div>
          </div>
          {form}
        </div>
      </div>
    );
  },

});

module.exports = Join;
