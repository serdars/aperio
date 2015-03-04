var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioStore = require('../stores/AperioStore');
var AperioApi = require('../AperioApi');

var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Badge = require('react-bootstrap').Badge;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var GROUP_FILTER = "FILTER_GROUP"
var ORG_FILTER = "FILTER_ORG"

// JOIN_APERIO   = 0
// ORG_CREATE    = 1
// GROUP_CREATE  = 2
// GROUP_JOIN    = 3
var ACTION_TEXT = [
  " joined Aperio ",
  " created organization ",
  " created group ",
  " joined group "
]

function getActionText(actionId) {
  return ACTION_TEXT[actionId]
}

function getItemLink(itemData) {
  return (
    <a href={"/" + itemData.type.toLowerCase() + "s/" + itemData.id} >
      {itemData.name}
    </a>
  );
}

var Timeline = React.createClass({
  getInitialState: function() {
    return {
      timeline: [ ]
    };
  },

  componentDidMount: function() {
    AperioStore.addChangeListener(this._onChange);
    AperioApi.loadTimeline();
  },

  componentWillUnmount: function() {
    AperioStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      timeline: AperioStore.getCurrentTimeline()
    });
  },

  render: function() {
    var entries = [ ];
    var timeline = this.state.timeline;
    for(var key in timeline) {
      var entry = timeline[key];
      var entryElements = [ getItemLink(entry.subject), getActionText(entry.action_type) ];

      if (entry.target != null) {
        entryElements.push(getItemLink(entry.target));
      }

      if (entry.related_to != null) {
        entryElements.push(" in organization ");
        entryElements.push(getItemLink(entry.related_to));
      }

      entryElements.push(" at " + entry.created_at + ".");

      entries.push(
        <div className="panel panel-default">
          <div className="panel-body">
            {entryElements}
          </div>
        </div>
      );
    }

    return (
      <div>
        {entries}
      </div>
    );
  },
});

module.exports = Timeline;
