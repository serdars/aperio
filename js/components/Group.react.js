var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var AperioActions = require('../AperioActions');
var OrganizationStore = require('../stores/OrganizationStore');
var CurrentUserStore = require('../stores/CurrentUserStore');
var AperioTextInput = require('./AperioTextInput.react');
var AperioConstants = require ("../AperioConstants");

var Group = React.createClass({
  propTypes: {
    orgId: ReactPropTypes.number.isRequired,
    id: ReactPropTypes.number
  },

  getInitialState: function() {
    return {
      isEditing: false,
      memberships: CurrentUserStore.getCurrentUser().memberships,
      group: OrganizationStore.getGroup(this.props.orgId, this.props.id),
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
    CurrentUserStore.addChangeListener(this._onUserChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
    CurrentUserStore.removeChangeListener(this._onUserChange);
  },

  _onUserChange: function() {
    this.setState({
      memberships: CurrentUserStore.getCurrentUser().memberships
    });
  },

  _onChange: function() {
    var group = OrganizationStore.getGroup(this.props.orgId, this.props.id);
    var newState = {
      group: group
    };

    // Mark editing complete if we're done.
    if (group.state == AperioConstants.ITEM_STATE_DONE) {
      newState["isEditing"] = false;
      newState["isCreating"] = false;
    }

    this.setState(newState);
  },

  _onCreate: function() {
    AperioActions.loadDefault(AperioConstants.ITEM_TYPE_GROUP);

    this.setState({
      isCreating: true
    });
  },

  _onJoin: function() {
    AperioActions.join({
      group_id: this.props.id
    })
  },

  _onManage: function() {
    if (this.state.isCreating) {
      AperioActions.createItem(AperioConstants.ITEM_TYPE_GROUP, {
        name: this.refs.name.getDOMNode().value.trim(),
        motto: this.refs.motto.getDOMNode().value.trim(),
        organization_id: this.props.orgId
      });
    } else if (this.state.isEditing) {
      // Update is not implemented yet
    }
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  isMember: function() {
    return (this.state.memberships.indexOf(this.props.id) != -1);
  },

  renderActions: function() {
    var manageButtonText;
    if (this.state.isEditing || this.state.isCreating) {
      manageButtonText = "Done";
    } else {
      manageButtonText = "Manage";
    }

    var joinButtonText;
    if (this.isMember()) {
      joinButtonText = "Member";
    } else {
      joinButtonText = "Join";
    }

    return (
      <div className="btn-group btn-group-xs pull-right" role="group">
        <button type="button" className="btn btn-default" onClick={this._onManage}>
          {manageButtonText}
        </button>
        <button type="button" className={cx({
          "btn": true,
          "btn-default": !this.isMember(),
          "btn-info": this.isMember()
        })} disabled={this.state.isEditing || this.state.isCreating || this.isMember()}
          onClick={this._onJoin}
        >
          {joinButtonText}
        </button>
        <button type="button" className="btn btn-danger"
          disabled={this.state.isEditing  || this.state.isCreating}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    )
  },

  renderCreateView: function() {
    return (
      <div className="panel-body">
        <button type="button" className="btn btn-primary" onClick={this._onCreate}>
          Create Group
        </button>
      </div>
    );
  },

  renderEditView: function() {
    return (
      <div className="panel-body">
        <div className="form-group">
          <AperioTextInput
            type="text" className="form-control"
            id="name" placeholder="Group Name"
            ref="name" value={this.state.group.item.name}
          />
        </div>
        <div className="form-group">
          <AperioTextInput
            type="motto" className="form-control"
            id="motto" placeholder="Motto"
            ref="motto" value={this.state.group.item.motto}
          />
        </div>
        {this.renderActions()}
      </div>
    );
  },



  renderShowView: function() {
    return (
      <div className="panel-body">
        <div className="pull-left">
          <h5> {this.state.group.item.name} </h5>
          <h6> {this.state.group.item.motto} </h6>
        </div>
        {this.renderActions()}
      </div>
    );

  },

  render: function() {
    var groupView;

    if (this.props.id == null && !this.state.isCreating) {
      groupView = this.renderCreateView();
    } else if (this.state.isEditing || this.state.isCreating) {
      groupView = this.renderEditView();
    } else {
      groupView = this.renderShowView();
    }

    return (
      <div className="panel panel-default">
        {groupView}
      </div>
    );
  },

});

module.exports = Group;
