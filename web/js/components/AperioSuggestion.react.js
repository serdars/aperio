var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var UserActions = require('../actions/UserActionCreators')
var SuggestionStore = require('../stores/SuggestionStore');

var AperioSuggestion = React.createClass({
  propTypes: {
    placeholder: ReactPropTypes.string.isRequired,
    onSelect: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    SuggestionStore.reset();

    return {
      query: "",
      suggestions: [ ],
      isLoading: false,
      isActive: false
    };
  },

  componentDidMount: function() {
    SuggestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SuggestionStore.removeChangeListener(this._onChange);
  },

  _onChange: function(event) {
    if (this.state.active) {
      this.setState({
        isLoading: false,
        suggestions: SuggestionStore.getSuggestions()
      });
    }
  },

  _onSelect: function(suggestion, event) {
    event.preventDefault();

    this.props.onSelect(suggestion);
    this.setState({
      isLoading: false,
      suggestions: [ ],
      query: ""
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

  _onFocus: function() {
    this.setState({
      active: true
    });
  },

  _onBlur: function(event) {
    this.setState({
      active: false
    });
  },

  render: function() {
    var suggestionViews = [ ];

    for(var i = 0; i < this.state.suggestions.length; i++) {
      var suggestion = this.state.suggestions[i];

      suggestionViews.push(
        <a href="#" className="list-group-item"
          onClick={this._onSelect.bind(this, suggestion)}>
          {suggestion.name} / {suggestion.email}
        </a>
      );
    }

  	return (
      <div>
        <div className={cx({
          "suggestion-loading": true,
          "invisible": !this.state.isLoading
        })}>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
        <input
          type="text" className="form-control"
          id="invitee" placeholder={this.props.placeholder}
          ref="invitee" onChange={this._onInput}
          value={this.state.query} onFocus={this._onFocus}
          onBlur={this._onBlur}
        />
        <div className="list-group invite-results">
          {suggestionViews}
        </div>
      </div>
    );
  },

});

module.exports = AperioSuggestion;
