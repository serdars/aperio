var React = require('react');
var ReactPropTypes = React.PropTypes;

var TimelineItems = require('./TimelineItems.react');
var TimelineFilters = require('./TimelineFilters.react');

var Timeline = React.createClass({
  _onFilter: function(filters) {
    console.log("Filtered!")
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-1 col-sm-7">
          <TimelineItems />
        </div>
        <div className="col-sm-3">
          <TimelineFilters onFilter={this._onFilter}/>
        </div>
      </div>
    );
  },
});

module.exports = Timeline;
