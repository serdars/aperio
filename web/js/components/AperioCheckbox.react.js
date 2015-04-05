var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var AperioCheckbox = React.createClass({

  propTypes: {
    value: ReactPropTypes.bool.isRequired,
    placeholder: ReactPropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  _onClick: function(event) {
    event.preventDefault();

    this.props.value = !this.props.value;
    this.setState({
      value: this.props.value
    });
  },

  render: function() {
    return (
      <div className="aperio-checkbox">
        <a href="#" onClick={this._onClick}>
          <i className={cx({
            "fa fa-lg horizontal-spacing": true,
            "fa-check-square-o": this.state.value,
            "fa-square-o": !this.state.value
          })}></i>
        </a>
        {this.props.placeholder}
      </div>
    );
  },

});

module.exports = AperioCheckbox;
