var React = require('react');

var TimelineStore = require('../stores/TimelineStore');
var AperioConstants = require('../AperioConstants');

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
    <a href={"#/" + itemData.type.toLowerCase() + "s/" + itemData.id} >
      {itemData.name}
    </a>
  );
}

var TimelineItems = React.createClass({
  getInitialState: function() {
    return {
      timeline: [ ]
    };
  },

  componentDidMount: function() {
    TimelineStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TimelineStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      timeline: TimelineStore.getTimeline()
    });
  },

  render: function() {
    var entries = [ ];
    var timeline = this.state.timeline;

    if (TimelineStore.getState() == AperioConstants.ITEM_STATE_LOADING) {
      entries.push(
        <div className="panel panel-default">
          <div className="panel-body">
            "Updating timeline!"
          </div>
        </div>
      );
    }

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

module.exports = TimelineItems;
