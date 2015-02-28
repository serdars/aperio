var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');
var Organization = require('./Organization.react');

var MainSection = React.createClass({

  propTypes: {
    timeline: ReactPropTypes.array.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are organizations.
    if (Object.keys(this.props.timeline).length < 1) {
      return null;
    }

    var timeline = this.props.timeline;
    var timelineEntries = [ ];

    for(var key in timeline) {
      timelineEntries.push(<li> {timeline[key]} </li>);
    }

    return (
      <section id="main">
        <ul id="timeline-list">{timelineEntries}</ul>
      </section>
    );
  },

});

module.exports = MainSection;
