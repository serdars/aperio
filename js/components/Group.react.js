var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var UserStore = require('../stores/UserStore');
var AperioTextInput = require('./AperioTextInput.react');

var Group = React.createClass({
  propTypes: {
    group: ReactPropTypes.object.isRequired
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
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onUserChange);
  },

  _onUserChange: function() {
    this.setState({
      memberships: UserStore.getUser().memberships
    });
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
    if (this.state.isCreating) {
      // TODO
      // AperioActions.createItem(AperioConstants.ITEM_TYPE_GROUP, {
      //   name: this.refs.name.getDOMNode().value.trim(),
      //   motto: this.refs.motto.getDOMNode().value.trim(),
      //   organization_id: this.props.orgId
      // });
    } else if (this.state.isEditing) {
      // TODO
      // Update is not implemented yet
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
      </div>
    )
  },

  renderCreateView: function() {
    return (
      <a href="#" className="list-group-item list-group-item-info"
        onClick={this._onCreate}
      >
        Create Group
      </a>
    );
  },

  renderEditView: function() {
    return (
      <div className="panel-body">
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
      </div>
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

    if (this.props.group == null) {
      groupView = this.renderCreateView();
    } else if (this.state.isEditing || this.state.isCreating) {
      groupView = this.renderEditView();
    } else {
      groupView = this.renderShowView();
    }

    return groupView;
  },

});

module.exports = Group;
