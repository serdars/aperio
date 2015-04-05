var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioTextInput = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string,
    type: ReactPropTypes.string,
    onChange: ReactPropTypes.func
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onBlur={this._onBlur}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
      />
    );
  },

  _onBlur: function() {
    // Nothing for now
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

  _onKeyDown: function(event) {
    // Nothing for now
  }

});

module.exports = AperioTextInput;
