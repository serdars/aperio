var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');
var AperioTextInput = require('./AperioTextInput.react');

var cx = require('react/lib/cx');

var Organization = React.createClass({

  propTypes: {
   organization: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  render: function() {
    var organization = this.props.organization;

    var input;
    if (this.state.isEditing) {
      input =
        <AperioTextInput
          className="edit"
          onSave={this._onSave}
          value={organization.text}
        />;
    }

    return (
      <li
        className={cx({
          'completed': organization.complete,
          'editing': this.state.isEditing
        })}
        key={organization.id}>
        <div className="view">
          <label onDoubleClick={this._onDoubleClick}>
            {organization.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  _onSave: function(text) {
    AperioActions.updateText(this.props.organization.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    AperioActions.destroy(this.props.organization.id);
  }

});

module.exports = Organization;
