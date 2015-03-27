var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserStore = require('../stores/UserStore');

var Profile = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.getUser()
    };
  },

  renderInvitations: function() {
    var invitationViews = [ ];
    for(var i = 0; i < this.state.user.invitations.length; i++) {
      var invitation = this.state.user.invitations[i];
      invitationViews.push(
        <li className="list-group-item">
          {invitation.inviter.name} invited you to {invitation.organization.name}.
        </li>
      );
    }
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Invitations</div>
        <ul className="list-group">
          {invitationViews}
        </ul>
      </div>
    );
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-3 col-sm-6">
          <h2>
            {this.state.user.name}
            <small>
              {this.state.user.email}
            </small>
          </h2>
          {this.renderInvitations()}
        </div>
      </div>
    );
  },
});

module.exports = Profile;
