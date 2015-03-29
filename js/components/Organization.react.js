var React = require('react');
var cx = require('react/lib/cx');
var Router = require('react-router');
var Navigation = Router.Navigation;
var RouteHandler = Router.RouteHandler;

var OrganizationStore = require('../stores/OrganizationStore');
var ErrorStore = require('../stores/ErrorStore');
var OrganizationActions = require('../actions/OrganizationActionCreators')

var AperioTextInput = require('./AperioTextInput.react');
var Group = require('./Group.react');
var AperioSuggestion = require('./AperioSuggestion.react');

_id = null;

var Organization = React.createClass({
  mixins: [Navigation],

  statics: {
    willTransitionTo: function(transition, params) {
      _id = params.id;
      if (_id != "new") {
        OrganizationActions.get(_id);
        OrganizationActions.timeline(_id);
      } else {
        OrganizationStore.reset();
      }
    }
  },

  isCreating: function() {
    return (_id == "new");
  },

  isMember: function() {
    return this.state.organization.is_member;
  },

  isAdmin: function() {
    return this.state.organization.is_admin;
  },

  getInitialState: function() {
    var organization;
    if (this.isCreating()) {
      organization = {
        name: "",
        motto: ""
      };
    } else {
      organization = OrganizationStore.get();
    }

    return {
      isEditing: false,
      organization: organization,
      messages: [ ]
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
    ErrorStore.addChangeListener(this._onError);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
    ErrorStore.removeChangeListener(this._onError);
  },

  _onChange: function() {
    var org = OrganizationStore.get();

    if (this.isCreating()) {
      // If we were creating, we are done now.
      this.transitionTo("organization", {id: org.id})
    }

    this.setState({
      organization: org,
      isEditing: false
    });
  },

  _onError: function() {
    this.setState({
      messages: [ ErrorStore.getError("organization") ]
    });
  },

  _onEdit: function(event) {
    event.preventDefault();

    if (this.isCreating()) {
      OrganizationActions.create({
        name: this.refs.name.getDOMNode().value.trim(),
        motto: this.refs.motto.getDOMNode().value.trim()
      });
    } else if (this.state.isEditing) {
      OrganizationActions.update(_id, {
        name: this.refs.name.getDOMNode().value.trim(),
        motto: this.refs.motto.getDOMNode().value.trim()
      });
    } else {
      this.setState({
        isEditing: true
      });
    }
  },

  _onJoin: function(event) {
    event.preventDefault();
    OrganizationActions.joinOrganization({
      organization_id: _id
    });
  },

  _invite: function(user) {
    OrganizationActions.invite({
      organization_id: _id,
      invitee_id: user.id
    });
  },

  _onInviteComplete: function() {
    // TODO
    this.setState({
      messages: [ "Your invitation is successfully sent!" ]
    });
  },

  renderOrgView: function() {
    var displayItems = [ ];

    if (this.isMember()) {
      displayItems.push(
        <div className="horizontal-spacing pull-left">
          <i className="fa fa-user"></i>
        </div>
      );
    } else {
      displayItems.push(
        <div className="horizontal-spacing pull-left">
          <a href="#" onClick={this._onJoin}>
            <i className="fa fa-user-plus"></i>
          </a>
        </div>
      );
    }

    displayItems.push(
      <div className="horizontal-spacing pull-left">
        {this.state.organization.name}
      </div>
    );

    displayItems.push(
      <div className="horizontal-spacing pull-left">
        <small> {this.state.organization.motto} </small>
      </div>
    );

    if (this.isAdmin()) {
      displayItems.push(
        <div className="horizontal-spacing pull-right">
          <a href="#" onClick={this._onEdit}>
            <i className="fa fa-gear"></i>
          </a>
        </div>
      );

      displayItems.push(
        <div className="horizontal-spacing pull-right org-invite-suggestion">
          <AperioSuggestion placeholder="Invite a user"
            onSelect={this._invite}
          />
        </div>
      );
    }

    displayItems.push(<div className="clearfix" />);

    return (<div className="org-view-bar">{displayItems}</div>);
  },

  renderOrgFormView: function() {
    return (
      <div className="form-inline pull-left">
        <div className="form-group organization-form-field">
          <AperioTextInput
            type="text" className="form-control"
            id="name" placeholder="Organization Name"
            ref="name" value={this.state.organization.name}
          />
        </div>
        <div className="form-group organization-form-field">
          <AperioTextInput
            type="motto" className="form-control"
            id="motto" placeholder="Motto"
            ref="motto" value={this.state.organization.motto}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={this._onEdit}>
          Done
        </button>
      </div>
    );
  },

  renderOrgGroupView: function() {
    var groupViews = [ ];
    var org = this.state.organization;
    var groups = org.groups;

    var viewListItems = [ ];

    for (var key in groups) {
      viewListItems.push(
        <Group org={this.state.organization} group={groups[key]} />
      );
    }

    viewListItems.push(<Group org={this.state.organization} group={{
      id: null,
      name: "",
      motto: "",
      private: false
    }} />);

    return (
      <ul className="list-group">
        {viewListItems}
      </ul>
    );
  },

  renderMessages: function() {
    var messages = [ ];
    for(var i = 0; i < this.state.messages.length; i++){
      messages.push(
        <div className="panel panel-default">
          <div className="panel-body">
            {this.state.messages[i]}
          </div>
        </div>
      );
    }

    return (<div>{messages}</div>);
  },

  render: function() {
    if (this.state.organization == null) {
      return (<div />);
    }

    if (this.state.isEditing || this.isCreating()) {
      return (
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
            <div className="row">
              {this.renderOrgFormView()}
            </div>
            <div className="row">
              {this.renderMessages()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
            <div className="row">
              {this.renderOrgView()}
            </div>
            <div className="row">
              <div className="col-sm-8">
                {this.renderMessages()}
                <RouteHandler />
              </div>
              <div className="col-sm-4">
                {this.renderOrgGroupView()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

});

module.exports = Organization;
