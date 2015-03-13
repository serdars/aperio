var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioActions = require('../AperioActions');
var OrganizationStore = require('../stores/OrganizationStore');
var AperioTextInput = require('./AperioTextInput.react');
var AperioConstants = require ("../AperioConstants");

var Group = React.createClass({
  propTypes: {
    orgId: ReactPropTypes.number.isRequired,
    id: ReactPropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false,
      group: OrganizationStore.getGroup(this.props.orgId, this.props.id),
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var group = OrganizationStore.getGroup(this.props.orgId, this.props.id);
    var newState = {
      group: group
    };

    // Mark editing complete if we're done.
    if (group.state == AperioConstants.ITEM_STATE_DONE) {
      newState["isEditing"] = false;
    }

    this.setState(newState);
  },

  _onManage: function() {
    if (this.state.isEditing) {
      // Update is not implemented yet
    }
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  renderActions: function() {
    var manageButtonText;
    if (this.state.isEditing) {
      manageButtonText = "Done";
    } else {
      manageButtonText = "Manage";
    }

    return (
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-default" onClick={this._onManage}>
          {manageButtonText}
        </button>
        <button type="button" className="btn btn-default"
          disabled={this.state.isEditing}
        >
          Join
        </button>
        <button type="button" className="btn btn-danger"
          disabled={this.state.isEditing}
        >
          Delete
        </button>
      </div>
    )
  },

  renderShowView: function() {
    var groupView = null;

    if (this.state.group.item == null) {
      return (<div />);
    }

    if (this.state.isEditing) {
      groupView = (
        <div className="col-sm-8">
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
        </div>
      )
    } else {
      groupView = (
        <div className="panel-body">
          <h5> {this.state.group.item.name} </h5>
          <h6> {this.state.group.item.motto} </h6>
        </div>
      );
    }

    return (
      <div className="panel panel-default">
        {groupView}
        {this.renderActions()}
      </div>
    );
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8">
          {this.renderShowView()}
        </div>
      </div>
    );
  },

});

module.exports = Group;
