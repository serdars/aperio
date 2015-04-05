var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var OrganizationStore = require('../stores/OrganizationStore');
var ActionStore = require('../stores/ActionStore');
var ConversationActions = require('../actions/ConversationActionCreators')
var AperioDropdown = require('./AperioDropdown.react');
var AperioTextarea = require('./AperioTextarea.react');
var AperioTextInput = require('./AperioTextInput.react');

var NewConversation = React.createClass({
  propTypes: {
    organizationId: ReactPropTypes.number,
  },

  componentDidMount: function() {
    ActionStore.addChangeListener(this._onDone);
  },

  componentWillUnmount: function() {
    ActionStore.removeChangeListener(this._onDone);
  },

  _onDone: function() {
    this.refs.title.setState({
      value: ""
    });

    this.refs.message.setState({
      value: ""
    });
  },

  _onCreate: function(event) {
    event.preventDefault();
    ConversationActions.create({
      group_id: this.refs.group.state.selection.id,
      organization_id: this.props.organizationId,
      title: this.refs.title.state.value,
      message: this.refs.message.state.value,
    });
  },

  render: function() {
    var groups = OrganizationStore.get().groups;

    return (
      <div className="panel">
        <div className="form-group">
          <AperioTextInput
            type="text" className="form-control"
            id="name" placeholder="Title"
            ref="title"
          />
        </div>
        <div className="vertical-spacing">
          <AperioTextarea className="form-control"
            rows="3" placeholder="Message" ref="message"
          />
        </div>
        <div className="vertical-spacing">
          <div className="pull-left horizontal-spacing">
            <AperioDropdown ref="group" prefix="Group:"
              objects={groups} placeholder="Select Group"
              ref="group"
            />
          </div>
          <div className="pull-left horizontal-spacing">
            <button type="button" className="btn btn-primary"
              onClick={this._onCreate}
            >
              Post
            </button>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  },

});

module.exports = NewConversation;
