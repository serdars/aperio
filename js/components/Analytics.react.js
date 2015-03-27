var React = require('react');
var ReactPropTypes = React.PropTypes;
var Navigation = require('react-router').Navigation;

var OrganizationStore = require('../stores/OrganizationStore');
var OrganizationActions = require('../actions/OrganizationActionCreators')

var _orgId = null;

var Analytics = React.createClass({
  mixins: [Navigation],

  statics: {
    willTransitionTo: function(transition, params) {
      _orgId = params.id;
      OrganizationActions.get(_orgId);
    }
  },

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
      <div className="panel panel-primary">
        <div className="panel-heading">Invitations</div>
        <ul className="list-group">
          {invitationViews}
        </ul>
      </div>
    );
  },

  render: function() {
    if (this.state.organization == null) {
      return (<div />);
    }

    return (
      <div className="row">
        <div className="col-sm-offset-3 col-sm-6">
          {this.renderInvitations()}
        </div>
      </div>
    );
  },
});

module.exports = Analytics;
