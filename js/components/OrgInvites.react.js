var React = require('react');
var ReactPropTypes = React.PropTypes;

var OrganizationStore = require('../stores/OrganizationStore');
var OrganizationActions = require('../actions/OrganizationActionCreators')

var OrgTabsMixin = require('../mixins/OrgTabsMixin');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = require('react-router').Link;

var OrgInvites = React.createClass({
  mixins: [Navigation, OrgTabsMixin],

  getInitialState: function() {
    return {
      organization: OrganizationStore.get()
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
  },

  _onChange: function(event) {
    this.setState({
      organization: OrganizationStore.get()
    })
  },

  renderInvitations: function() {
    var invitationViews = [ ];
    var message = {
      "accepted": "Accepted",
      "declined": "Declined",
      "waiting":  "Waiting Response"
    };

    if (this.state.organization.invitations.length == 0) {
      invitationViews.push(
        <li className="list-group-item">
          There are no invitations for your organization.
        </li>
      );
    } else {
      for(var i = 0; i < this.state.organization.invitations.length; i++) {
        var invitation = this.state.organization.invitations[i];

        invitationViews.push(
          <li className="list-group-item">
            {invitation.inviter.name} invited {invitation.invitee.name}.
            <div className="pull-right">
              {message[invitation.state]}
            </div>
          </li>
        );
      }
    }

    return (
      <div className="panel panel-default">
        <ul className="list-group">
          {invitationViews}
        </ul>
      </div>
    );
  },

  render: function() {
    return (
      <div className="row">
        {this.renderTabs()}
        <div className="organization-main-view">
          {this.renderInvitations()}
        </div>
      </div>
    );
  },
});

module.exports = OrgInvites;
