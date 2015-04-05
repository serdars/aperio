var React = require('react');
var ReactPropTypes = React.PropTypes;

var OrganizationStore = require('../stores/OrganizationStore');
var OrganizationActions = require('../actions/OrganizationActionCreators')

var OrgTabsMixin = require('../mixins/OrgTabsMixin');
var Router = require('react-router');
var Navigation = Router.Navigation;

var Conversation = require('./Conversation.react');

var OrgConversations = React.createClass({
  mixins: [Navigation, OrgTabsMixin],

  getInitialState: function() {
    return {
      organization: OrganizationStore.get()
    };
  },

  componentDidMount: function() {
    OrganizationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    OrganizationStore.removeChangeListener(this._onChange);
  },

  _onChange: function(event) {
    this.setState({
      organization: OrganizationStore.get()
    })
  },

  render: function() {
    var conversationViews = [ ];
    var conversations = this.state.organization.conversations;

    for(var i = 0; i < conversations.length; i++) {
      conversationViews.push(
        <Conversation conversation={conversations[i]} />
      );
    }

    return (
      <div className="row">
        {this.renderTabs()}
        <div className="organization-main-view">
          {conversationViews}
        </div>
      </div>
    );
  },
});

module.exports = OrgConversations;
