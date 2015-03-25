var React = require('react');
var cx = require('react/lib/cx');
var Navigation = require('react-router').Navigation;

var OrganizationStore = require('../stores/OrganizationStore');
var ErrorStore = require('../stores/ErrorStore');
var OrganizationActions = require('../actions/OrganizationActionCreators')
var UserActions = require('../actions/UserActionCreators')

var AperioTextInput = require('./AperioTextInput.react');
var Group = require('./Group.react');
var TimelineItems = require('./TimelineItems.react');

_id = null;

var Organization = React.createClass({
  mixins: [Navigation],

  statics: {
    willTransitionTo: function(transition, params) {
      _id = params.id;
      if (_id != "new") {
        OrganizationActions.get(_id);
        UserActions.timeline();
      }
    },

    willTransitionFrom: function (transition, component) {
      OrganizationStore.reset();
    }
  },

  isCreating: function() {
    return (_id == "new");
  },

  isMember: function() {
    return this.state.organization.is_member;
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
      error: ErrorStore.getError("organization")
    });
  },

  _onManage: function() {
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

  _onJoin: function() {
    OrganizationActions.joinOrganization({
      organization_id: _id
    });
  },

  renderMessageView: function() {
    if (this.state.error != null) {
      return (
        <div className="panel panel-default">
          <div className="panel-body">
            {message}
          </div>
        </div>
      );
    } else {
      return (<div />);
    }
  },

  renderOrgDisplayView: function() {
    return (
      <div className="organization-info pull-left">
        <h2>
          {this.state.organization.name}
          <small>
            {this.state.organization.motto }
          </small>
        </h2>
      </div>
    );
  },

  renderOrgInfoView: function() {
    var viewDisplay;

    if (this.state.isEditing || this.isCreating()) {
      viewDisplay = this.renderOrgFormView();
    } else {
      viewDisplay = this.renderOrgDisplayView();
    }

    return (
      <div className="row">
        {viewDisplay}
        {this.renderActions()}
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
        <Group orgId={_id} group={groups[key]} />
      );
    }

    viewListItems.push(<Group orgId={_id} group={{
      id: null,
      name: "",
      motto: ""
    }} />);

    return (
      <ul className="list-group">
        {viewListItems}
      </ul>
    );
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
      </div>
    );
  },

  renderActions: function() {
    var manageButtonText;
    if (this.state.isEditing) {
      manageButtonText = "Done";
    } else if (this.isCreating()) {
      manageButtonText = "Create";
    } else {
      manageButtonText = "Manage";
    }

    var joinButtonText = "Join";
    if (this.isMember()) {
      joinButtonText = "Member";
    } else {
      joinButtonText = "Join";
    }

    return (
      <div className="btn-group pull-right" role="group">
        <button type="button" className="btn btn-default" onClick={this._onManage}>
          {manageButtonText}
        </button>
        <button type="button" className="btn btn-default"
          disabled={this.isCreating() || this.state.isEditing}
        >
          Analytics
        </button>
        <button type="button" className={cx({
          "btn": true,
          "btn-default": this.isMember(),
          "btn-info": !this.isMember()
        })} disabled={this.isCreating() || this.state.isEditing || this.isMember()}
          onClick={this._onJoin}
        >
          {joinButtonText}
        </button>
      </div>
    )
  },

  renderOrgMainView: function() {
    if (!this.isCreating()) {
      return (
        <div className="row">
          <div className="col-sm-8">
            <TimelineItems />
          </div>
          <div className="col-sm-4">
            {this.renderOrgGroupView()}
          </div>
        </div>
      );
    } else {
      return (<div />);
    }

  },

  render: function() {
    var viewElements = [ ];

    if (this.state.organization == null) {
      return (<div />);
    }

    viewElements.push(this.renderMessageView());
    viewElements.push(this.renderOrgInfoView());
    viewElements.push(this.renderOrgMainView());

    return (
      <div className="row">
        <div className="col-sm-offset-1 col-sm-10">
          {viewElements}
        </div>
      </div>
    );
  },

});

module.exports = Organization;
