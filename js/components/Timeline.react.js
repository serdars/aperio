var React = require('react');
var ReactPropTypes = React.PropTypes;

var TimelineItems = require('./TimelineItems.react');

var Timeline = React.createClass({
  _onFilter: function(filters) {
    console.log("Filtered!")
  },

  render: function() {
    return (
      <div className="row">
        <TimelineItems />
      </div>
    );
  },
});

module.exports = Timeline;
