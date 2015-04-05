var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActionCreators')

var Profile = React.createClass({
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

  _onChange: function(event) {
    this.setState({
      user: UserStore.getUser()
    })
  },

  _onAccept: function(invitationId, event) {
    event.preventDefault();
    UserActions.acceptInvite(invitationId);
  },

  _onDecline: function(invitationId, event) {
    UserActions.declineInvite(invitationId);
  },

  renderInvitations: function() {
    var invitationViews = [ ];
    if (this.state.user.invitations.length == 0) {
      invitationViews.push(
        <li className="list-group-item">
          There are no invitations for you.
        </li>
      );
    } else {
      for(var i = 0; i < this.state.user.invitations.length; i++) {
        var invitation = this.state.user.invitations[i];

        var actionsView;
        if (invitation.state == "accepted") {
          actionsView = (
            <div className="pull-right">
              Accepted
            </div>
          );
        } else if (invitation.state == "declined") {
          actionsView = (
            <div className="pull-right">
              Declined
            </div>
          );
        } else {
          actionsView = (
            <div className="btn-group btn-group-xs pull-right" role="invitations">
              <button type="button" className="btn btn-default"
                onClick={this._onAccept.bind(this, invitation.id)}
              >
                Accept
              </button>
              <button type="button" className="btn btn-default"
                onClick={this._onDecline.bind(this, invitation.id)}
              >
                Decline
              </button>
            </div>
          );
        }


        invitationViews.push(
          <li className="list-group-item">
            {invitation.inviter.name} invited you to {invitation.organization.name} organization.
            {actionsView}
          </li>
        );
      }
    }

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          Invitations for you ({this.state.user.name} - {this.state.user.email})
        </div>
        <ul className="list-group">
          {invitationViews}
        </ul>
      </div>
    );
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8">
          {this.renderInvitations()}
        </div>
      </div>
    );
  },
});

module.exports = Profile;
