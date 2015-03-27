var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserActions = require('../actions/UserActionCreators')
var InvitationStore = require('../stores/InvitationStore');

var InviteForm = React.createClass({
  propTypes: {
    orgId: ReactPropTypes.string.isRequired,
    onInvite: ReactPropTypes.func //Not sure if necessary
  },

  getInitialState: function() {
    InvitationStore.reset();

    return {
      query: "",
      suggestions: [ ],
      isLoading: false,
      showMessage: false
    };
  },

  componentDidMount: function() {
    InvitationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    InvitationStore.removeChangeListener(this._onChange);
  },

  _onChange: function(event) {
    if (InvitationStore.getInvitation() == null) {
      this.setState({
        isLoading: false,
        suggestions: InvitationStore.getSuggestions(),
        showMessage: false
      });
    } else {
      this.setState({
        query: "",
        isLoading: false,
        suggestions: [ ],
        showMessage: true
      })
    }
  },

  _onSelect: function(user_id, event) {
    event.preventDefault();

    UserActions.invite({
      invitee_id: user_id,
      organization_id: this.props.orgId
    });
  },

  _onInput: function(value) {
    var query = event.target.value;

    // TODO: debounce
    if (query != "") {
      UserActions.search(query);

      this.setState({
        query: query,
        isLoading: true,
        showMessage: false
      });
    } else {
      this.setState({
        query: query,
        suggestions: [ ],
        showMessage: false
      });
    }
  },

  renderMessage: function() {
    if (this.state.showMessage) {
      return (
        <div className="alert alert-info alert-dismissible pull-left">
          Your invitation is successfully sent!
        </div>
      );
    } else {
      return (<div />);
    }
  },

  renderLoading: function() {
    if (this.state.isLoading) {
      return (
        <div className="pull-left">
          Loading...
        </div>
      );
    } else {
      return (<div />);
    }
  },

  render: function() {
    var suggestionViews = [ ];

    for(var i = 0; i < this.state.suggestions.length; i++) {
      var suggestion = this.state.suggestions[i];

      suggestionViews.push(
        <a href="#" className="list-group-item"
          onClick={this._onSelect.bind(this, suggestion.id)}>
          {suggestion.name} / {suggestion.email}
        </a>
      );
    }

  	return (
      <div className="form-inline">
        <div className="form-group pull-left">
          <input
            type="text" className="form-control invite-input"
            id="invitee" placeholder="Invite Someone"
            ref="invitee" onChange={this._onInput}
            value={this.state.query}
          />
          <div className="list-group invite-results">
            {suggestionViews}
          </div>
        </div>
        {this.renderLoading()}
        {this.renderMessage()}
        <div className="clearfix" />
      </div>
    );
  },

});

module.exports = InviteForm;
