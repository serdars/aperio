var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var AperioDropdown = React.createClass({

  propTypes: {
    placeholder: ReactPropTypes.string,
    prefix: ReactPropTypes.string,
    objects: ReactPropTypes.array,
  },

  getInitialState: function() {
    return {
      selection: null,
      isSelecting: false,
    };
  },

  selectionText: function() {
    var txt = (this.state.selection == null) ? this.props.placeholder : (this.props.prefix + " " + this.state.selection.name);
    return txt;
  },

  _onDrop: function() {
    this.setState({
      isSelecting: !this.state.isSelecting
    });
  },

  render: function() {
    var selections = [ ];
    for(var i = 0; i < this.props.objects.length; i++) {
      selections.push(
        <li className="list-group-item">
          {this.props.objects[i].name}
        </li>
      );
    }
    return (
      <div className="aperio-dropdown">
        <button type="button" className="btn"
          onClick={this._onDrop}
        >
          {this.selectionText()}
          <i className="fa fa-caret-down" />
        </button>
        <ul className={cx({
          "list-group invite-results": true,
          "invisible": !this.state.isSelecting
        })}>
          {selections}
        </ul>
      </div>
    );
  },
});

module.exports = AperioDropdown;
