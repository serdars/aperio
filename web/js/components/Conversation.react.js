var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var OrganizationActions = require('../actions/OrganizationActionCreators')

var OrganizationStore = require('../stores/OrganizationStore');
var AperioTextInput = require('./AperioTextInput.react');
var AperioCheckbox = require('./AperioCheckbox.react');
var AperioSuggestion = require('./AperioSuggestion.react');

var Conversation = React.createClass({
  propTypes: {
    conversation: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      conversation: this.props.conversation
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onOrgChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onOrgChange);
  },

  _onOrgChange: function() {
    // TODO: Update this.state.conversation
  },

  _onPost: function() {
    // TODO: OrganizationActions.postMessage()
  },

  render: function() {
    var messageViews = [ ];
    var messages = this.state.conversation.messages;

    for(var i = 0; i < messages.length; i++) {
      messageViews.push(
        <div className="list-group-item">
          {messages[i].body}
          <div className="aperio-subtitle">
            Posted by {messages[i].user.name} at {messages[i].updated_at}
          </div>
        </div>
      );
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            {this.state.conversation.title}
          </h4>
          <div className="aperio-subtitle">
            Posted to
            <span className="label label-primary">
              {this.state.conversation.group.name}
            </span>
            Group, {messages.length} messages
          </div>
        </div>
        <div className="list-group">
          {messageViews}
        </div>
      </div>
    );
  },

});

module.exports = Conversation;
