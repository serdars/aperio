var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var CurrentUserStore = require('../stores/CurrentUserStore');
var AperioActions = require('../AperioActions');

var RegisterForm = require('./RegisterForm.react');
var LoginForm = require('./LoginForm.react');

var Join = React.createClass({
  propTypes: {
    active: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      active: this.props.active,
      error: null,
      current_user: CurrentUserStore.getCurrentUser()
    }
  },

  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CurrentUserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      error: CurrentUserStore.getError(),
      current_user: CurrentUserStore.getCurrentUser()
    });
  },

  _onSubmit: function(data) {
    if (this.state.active == "register") {
      AperioActions.register(data);
    } else {
      AperioActions.login(data);
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

  renderErrorView: function() {
    return (
      <div className="col-sm-offset-4 col-sm-4">
        Oops! Some problems: {this.state.error}
      </div>
    );
  },

  render: function() {
    var internalView;

    if (this.state.current_user != null) {
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
