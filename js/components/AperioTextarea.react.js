var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioTextarea = React.createClass({
  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string,
    rows: ReactPropTypes.number,
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    return (
      <textarea
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        value={this.state.value}
        rows={this.props.rows}
      />
    );
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

});

module.exports = AperioTextarea;
