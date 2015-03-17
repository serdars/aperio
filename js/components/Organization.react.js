var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioActions = require('../AperioActions');
var OrganizationStore = require('../stores/OrganizationStore');
var AperioConstants = require ("../AperioConstants");

var AperioTextInput = require('./AperioTextInput.react');
var Group = require('./Group.react');

var Organization = React.createClass({
  propTypes: {
   id: ReactPropTypes.string.isRequired
  },

  isCreating: function() {
    return (this.state.organization.item.id == null);
  },

  getInitialState: function() {
    return {
      isEditing: false,
      organization: OrganizationStore.getOrganization(this.props.id),
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var org = OrganizationStore.getOrganization();
    var newState = {
      organization: org
    };

    // Mark editing complete if we're done.
    if (org.state == AperioConstants.ITEM_STATE_DONE) {
      newState["isEditing"] = false;
    }

    this.setState(newState);
  },

  _onManage: function() {
    if (this.isCreating()) {
      AperioActions.createItem(AperioConstants.ITEM_TYPE_ORGANIZATION, {
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

  renderMessageView: function() {
    var message = null;

    if (this.state.organization != null) {
      switch(this.state.organization.state) {
        case AperioConstants.ITEM_STATE_LOADING:
          message = "Loading organization";
          break;
        case AperioConstants.ITEM_STATE_ERROR:
          message = this.state.organization.error.message;
          break
        default:
          // no-op
      }
    }

    if (message != null) {
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
        <h2> {this.state.organization.item.name} </h2>
        <h4> {this.state.organization.item.motto} </h4>
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
      <div className="organization-form pull-left">
        <div className="form-group">
          <AperioTextInput
            type="text" className="form-control"
            id="name" placeholder="Organization Name"
            ref="name" value={this.state.organization.item.name}
          />
        </div>
        <div className="form-group">
          <AperioTextInput
            type="motto" className="form-control"
            id="motto" placeholder="Motto"
            ref="motto" value={this.state.organization.item.motto}
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
        <button type="button" className="btn btn-default"
          disabled={this.isCreating() || this.state.isEditing}
        >
          Join
        </button>
        <button type="button" className="btn btn-danger"
          disabled={this.isCreating() || this.state.isEditing}
        >
          <i className="fa fa-trash fa-lg"></i>
        </button>
      </div>
    )
  },

  render: function() {
    var viewElements = [ ];

    if (this.state.organization.item == null) {
      return (<div />);
    }

    viewElements.push(this.renderMessageView());
    viewElements.push(this.renderOrgInfoView());
    viewElements.push(this.renderOrgGroupView());

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
