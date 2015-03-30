var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var OrganizationStore = require('../stores/OrganizationStore');
var AperioDropdown = require('./AperioDropdown.react');
var AperioTextarea = require('./AperioTextarea.react');

var NewConversation = React.createClass({
  propTypes: {
    organizationId: ReactPropTypes.number,
    groupId: ReactPropTypes.number,
  },

  getInitialState: function() {
    return {
      organizationId: this.props.organizationId,
      groupId: this.props.groupId
    };
  },

  _onCreate: function(event) {
    event.preventDefault();
    console.log("Will post now.")
  },

  render: function() {
    var groups = OrganizationStore.get().groups;
    
    return (
      <div className="panel">
        <div className="vertical-spacing">
          <AperioTextarea className="form-control"
            rows="3"
          />
        </div>
        <div className="vertical-spacing">
          <div className="pull-left horizontal-spacing">
            <AperioDropdown ref="group" prefix="Group:"
              objects={groups} placeholder="Select Group"
            />
          </div>
          <div className="pull-left horizontal-spacing">
            <button type="button" className="btn btn-primary"
              onClick={this._onCreate}
            >
              Post
            </button>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  },

});

module.exports = NewConversation;
