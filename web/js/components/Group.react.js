var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var OrganizationActions = require('../actions/OrganizationActionCreators')

var OrganizationStore = require('../stores/OrganizationStore');
var AperioTextInput = require('./AperioTextInput.react');
var AperioCheckbox = require('./AperioCheckbox.react');
var AperioSuggestion = require('./AperioSuggestion.react');

var Group = React.createClass({
  propTypes: {
    group: ReactPropTypes.object.isRequired,
    org: ReactPropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isEditing: false,
      group: this.props.group,
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onOrgChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onOrgChange);
  },

  _onOrgChange: function() {
    if (this.state.isEditing) {
      // If we have been creating or editing we are done now.
      this.setState({
        group: this.props.group,
        isEditing: false
      });
    }
  },

  _onCreate: function() {
    this.setState({
      isEditing: true
    });
  },

  _onJoin: function(event) {
    event.preventDefault();

    OrganizationActions.joinGroup({
      group_id: this.props.group.id
    });
  },

  _onEdit: function(event) {
    event.preventDefault();

    if (this.state.isEditing) {
      if (this.props.group.id == null) {
        OrganizationActions.createGroup({
          organization_id: this.props.org.id,
          name: this.refs.name.getDOMNode().value.trim(),
          motto: this.refs.motto.getDOMNode().value.trim(),
          private: this.refs.private.state.value
        });
      } else {
        OrganizationActions.updateGroup(this.props.group.id, {
          organization_id: this.props.org.id,
          name: this.refs.name.getDOMNode().value.trim(),
          motto: this.refs.motto.getDOMNode().value.trim(),
          private: this.refs.private.state.value
        });
      }
    } else {
      this.setState({
        isEditing: true
      });
    }
  },

  _addMember: function(user) {
    OrganizationActions.joinGroup({
      group_id: this.props.group.id,
      user_id: user.id
    });
  },

  isMember: function() {
    return this.state.group.is_member;
  },

  renderCreateView: function() {
    return (
      <li className="list-group-item">
        <button type="button" className="btn btn-primary btn-block"
          onClick={this._onCreate}
        >
          Create Group
        </button>
      </li>
    );
  },

  renderEditView: function() {
    return (
      <li className="list-group-item">
        <div className="form-group">
          <AperioTextInput
            type="text" className="form-control"
            id="name" placeholder="Group Name"
            ref="name" value={this.state.group.name}
          />
        </div>
        <div className="form-group">
          <AperioTextInput
            type="motto" className="form-control"
            id="motto" placeholder="Motto"
            ref="motto" value={this.state.group.motto}
          />
        </div>
        <div className="form-group group-invite-suggestion">
          <AperioSuggestion placeholder="Add a member"
            onSelect={this._addMember}
          />
        </div>
        <div className="form-group pull-left">
          <AperioCheckbox value={this.state.group.private} placeholder="Private" ref="private"/>
        </div>
        <button type="button" className="btn btn-sm btn-primary pull-right" onClick={this._onEdit}>
          Done
        </button>
        <div className="clearfix" />
      </li>
    );
  },



  renderShowView: function() {
    var privateText = this.state.group.private ? "Private" : "Public";
    var viewElements = [ ];

    if (this.isMember()) {
      viewElements.push(
        <div className="horizontal-spacing pull-left">
          <i className="fa fa-user"></i>
        </div>
      );
    } else {
      viewElements.push(
        <div className="horizontal-spacing pull-left">
          <a href="#" onClick={this._onJoin}>
            <i className="fa fa-user-plus"></i>
          </a>
        </div>
      );
    }

    viewElements.push(
      <div className="horizontal-spacing pull-left">
        {this.state.group.name}
      </div>
    );

    if (this.props.org.is_admin) {
      viewElements.push(
        <div className="horizontal-spacing pull-right">
          <a href="#" onClick={this._onEdit}>
            <i className="fa fa-gear"></i>
          </a>
        </div>
      );
    }

    viewElements.push(<div className="clearfix" />);

    return (
      <li className="list-group-item">
        <div className="group-view-bar-header">
          {viewElements}
        </div>
        <div className="aperio-subtitle">
          {this.state.group.motto}, {privateText}, {this.state.group.member_count} members
        </div>
      </li>
    );

  },

  render: function() {
    var groupView;

    if (this.props.group.id == null && !this.state.isEditing) {
      groupView = this.renderCreateView();
    } else if (this.state.isEditing) {
      groupView = this.renderEditView();
    } else {
      groupView = this.renderShowView();
    }

    return groupView;
  },

});

module.exports = Group;
