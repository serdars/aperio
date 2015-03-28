var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var UserActions = require('../actions/UserActionCreators')
var InvitationStore = require('../stores/InvitationStore');

var InviteForm = React.createClass({
  propTypes: {
    orgId: ReactPropTypes.string.isRequired,
    onInviteComplete: ReactPropTypes.func
  },

  getInitialState: function() {
    InvitationStore.reset();

    return {
      query: "",
      suggestions: [ ],
      isLoading: false
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
        suggestions: InvitationStore.getSuggestions()
      });
    } else {
      if (this.props.onInviteComplete != null) {
        this.props.onInviteComplete();
      }

      this.setState({
        query: "",
        isLoading: false,
        suggestions: [ ]
      });
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
        isLoading: true
      });
    } else {
      this.setState({
        query: query,
        suggestions: [ ]
      });
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
      <div>
        <div className={cx({
          "pull-left": true,
          "invisible": !this.state.isLoading
        })}>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
        <div className="pull-left">
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
        <div className="clearfix" />
      </div>
    );
  },

});

module.exports = InviteForm;
