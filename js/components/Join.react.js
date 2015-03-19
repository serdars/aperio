var React = require('react');
var cx = require('react/lib/cx');

var UserStore = require('../stores/UserStore');
var ErrorStore = require('../stores/ErrorStore');
var UserActions = require('../actions/UserActionCreators')

var RegisterForm = require('./RegisterForm.react');
var LoginForm = require('./LoginForm.react');

var Join = React.createClass({
  getInitialState: function() {
    return {
      active: "register",
      error: null,
      user: UserStore.getUser()
    }
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onUserChange);
    ErrorStore.addChangeListener(this._onError);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onUserChange);
    ErrorStore.removeChangeListener(this._onError);
  },

  _onError: function() {
    this.setState({
      error: ErrorStore.getError(this.state.active)
    });
  },

  _onUserChange: function() {
    this.setState({
      error: null,
      user: UserStore.getUser()
    });
  },

  _onSubmit: function(data) {
    if (this.state.active == "register") {
      UserActions.register(data);
    } else {
      UserActions.login(data);
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

  renderJoinForm: function() {
    var form;
    if (this.state.active == "register") {
      form = <RegisterForm onSubmit={this._onSubmit} />
    } else {
      form = <LoginForm onSubmit={this._onSubmit} />
    }

    var errors;
    if (this.state.error != null) {
      errors = (
        <div className="panel panel-warning">
          <div className="panel-body panel-warning">
            Oops! Some problems: {this.state.error}
          </div>
        </div>
      );
    } else {
      errors = (<div />);
    }

    return (
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
        {errors}
        {form}
      </div>
    );
  },

  renderSuccessView: function() {
    return (
      <div className="col-sm-offset-4 col-sm-4">
        Welcome to Aperio!
      </div>
    );
  },

  render: function() {
    var internalView;

    if (this.state.user != null) {
      internalView = this.renderSuccessView();
    } else {
      internalView = this.renderJoinForm();
    }

  	return (
      <div className="row">
        {internalView}
      </div>
    );
  },

});

module.exports = Join;
