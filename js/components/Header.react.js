var React = require('react');
var AperioActions = require('../actions/AperioActions');
var AperioTextInput = require('./AperioTextInput.react');

var Header = React.createClass({
  render: function() {
    return (
      <header id="header">
        <h1>Aperio</h1>
        <AperioTextInput
          id="new-org"
          placeholder="Organization Name"
          onSave={this._onSave}
        />
      </header>
    );
  },

  _onSave: function(text) {
    if (text.trim()){
      AperioActions.create(text);
    }

  }

});

module.exports = Header;
