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

  _onDrop: function(event) {
    event.preventDefault();
    this.setState({
      isSelecting: !this.state.isSelecting
    });
  },

  _onSelect: function(itemKey, event) {
    event.preventDefault();
    this.setState({
      selection: this.props.objects[itemKey],
      isSelecting: false
    });
  },

  _onOutsideClick: function(event) {
    this.setState({
      isSelecting: false
    });
  },

  render: function() {
    var selections = [ ];

    document.removeEventListener("click", this._onOutsideClick);
    if (this.state.isSelecting) {
      document.addEventListener("click", this._onOutsideClick);
    }

    for(var i = 0; i < this.props.objects.length; i++) {
      selections.push(
        <a href="#" className="list-group-item" onClick={this._onSelect.bind(this,i)}>
          {this.props.objects[i].name}
        </a>
      );
    }
    return (
      <div className="aperio-dropdown">
        <a href="#" className="btn btn-primary"
          onClick={this._onDrop}
        >
          {this.selectionText()}
          <i className="fa fa-caret-down" />
        </a>
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
