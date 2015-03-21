var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var OrganizationActions = require('../actions/OrganizationActionCreators')

var UserStore = require('../stores/UserStore');
var OrganizationStore = require('../stores/OrganizationStore');
var AperioTextInput = require('./AperioTextInput.react');

var Group = React.createClass({
  propTypes: {
    group: ReactPropTypes.object.isRequired,
    orgId: ReactPropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      isEditing: false,
      memberships: UserStore.getUser().memberships,
      group: this.props.group,
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onUserChange);
    OrganizationStore.addChangeListener(this._onOrgChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onUserChange);
    OrganizationStore.removeChangeListener(this._onOrgChange);
  },

  _onUserChange: function() {
    this.setState({
      memberships: UserStore.getUser().memberships
    });
  },

  _onOrgChange: function() {
    if (this.state.isEditing) {
      // If we have been creating or editing we are done now.
      this.setState({
        group: this.props.group,
        isEditing: false
      })
    }
  },

  _onCreate: function() {
    this.setState({
      isEditing: true
    });
  },

  _onJoin: function() {
    // TODO
    // AperioActions.join({
    //   group_id: this.props.id
    // })
  },

  _onManage: function() {
    if (this.state.isEditing) {
      if (this.props.group.id == null) {
        OrganizationActions.createGroup({
          organization_id: this.props.orgId,
          name: this.refs.name.getDOMNode().value.trim(),
          motto: this.refs.motto.getDOMNode().value.trim()
        });
      } else {
        OrganizationActions.updateGroup(this.props.group.id, {
          organization_id: this.props.orgId,
          name: this.refs.name.getDOMNode().value.trim(),
          motto: this.refs.motto.getDOMNode().value.trim()
        });
      }
    } else {
      this.setState({
        isEditing: true
      });
    }
  },

  isMember: function() {
    return (this.state.memberships.indexOf(this.state.group.id) != -1);
  },

  renderActions: function() {
    var manageButtonText;
    if (this.state.isEditing) {
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
        })} disabled={this.state.isEditing || this.isMember()}
          onClick={this._onJoin}
        >
          {joinButtonText}
        </button>
      </div>
    )
  },

  renderCreateView: function() {
    return (
      <li className="list-group-item">
        <button type="button" className="btn btn-info btn-block"
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
        {this.renderActions()}
        <div className="clearfix" />
      </li>
    );
  },



  renderShowView: function() {
    return (
      <li className="list-group-item">
        {this.renderActions()}
        <h5 className="list-group-item-heading">
          {this.state.group.name}
        </h5>
        <h6 className="list-group-item-heading">
          {this.state.group.motto}
        </h6>
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
