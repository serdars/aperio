var React = require('react');
var cx = require('react/lib/cx');
var Navigation = require('react-router').Navigation;

var OrganizationStore = require('../stores/OrganizationStore');
var UserStore = require('../stores/UserStore');
var ErrorStore = require('../stores/ErrorStore');
var OrganizationActions = require('../actions/OrganizationActionCreators')

var AperioTextInput = require('./AperioTextInput.react');
var Group = require('./Group.react');

_id = null;

var OrgHandler = React.createClass({
  mixins: [Navigation],

  statics: {
    willTransitionTo: function(transition, params) {
      _id = params.id;

      // TODO: Load organization if it is not new.
    }
  },

  isCreating: function() {
    return (_id == "new");
  },

  isMember: function() {
    // TODO: fix
    return false;
    // var groups = OrganizationStore.getGroups();
    //
    // // Return true if user is a member of any group
    // for(var key in groups) {
    //   if (this.state.memberships.indexOf(groups[key].item.id) != -1) {
    //     return true;
    //   }
    // }
    //
    // return false;
  },

  getInitialState: function() {
    var memberships;
    var user = UserStore.getUser();
    if (user) {
      memberships = user.memberships;
    } else {
      memberships = [ ];
    }

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
      memberships: memberships,
      organization: organization,
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onUserChange);
    ErrorStore.addChangeListener(this._onError);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onUserChange);
    ErrorStore.removeChangeListener(this._onError);
  },


  _onUserChange: function() {
    this.setState({
      memberships: UserStore.getCurrentUser().memberships
    });
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
      error: ErrorStore.getError("org_create")
    });
  },

  _onManage: function() {
    if (this.isCreating()) {
      OrganizationActions.create({
        name: this.refs.name.getDOMNode().value.trim(),
        motto: this.refs.motto.getDOMNode().value.trim()
      });
    } else if (this.state.isEditing) {
      // Update is not implemented yet
    }

    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  _onJoin: function() {
    // TODO: fix
    // AperioActions.join({
    //   organization_id: this.props.id
    // })
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
    var org = this.state.organization.item;
    var groups = OrganizationStore.getGroups();

    var rowViews = [ ];

    for (var key in groups) {
      rowViews.push(
        <div className="col-sm-4">
          <Group orgId={org.id} id={groups[key].item.id} />
        </div>
      );

      if (rowViews.length == 3) {
        groupViews.push(
          <div className="row">
            {rowViews}
          </div>
        );

        rowViews = [ ];
      }
    }

    // For creating a group
    rowViews.push(
      <div className="col-sm-4">
        <Group orgId={org.id} />
      </div>
    );

    if (rowViews.length != 0) {
      groupViews.push(
        <div className="row">
          {rowViews}
        </div>
      );
    }

    return groupViews;
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
          "btn-default": !this.isMember(),
          "btn-info": this.isMember()
        })} disabled={this.isCreating() || this.state.isEditing}
          onClick={this._onJoin}
        >
          {joinButtonText}
        </button>
      </div>
    )
  },

  render: function() {
    var viewElements = [ ];

    if (this.state.organization == null) {
      return (<div />);
    }

    viewElements.push(this.renderMessageView());
    viewElements.push(this.renderOrgInfoView());
    // if (!this.isCreating()) {
    //   viewElements.push(this.renderOrgGroupView());
    // }

    return (
      <div className="row">
        <div className="col-sm-offset-1 col-sm-10">
          {viewElements}
        </div>
      </div>
    );
  },

});

module.exports = OrgHandler;
