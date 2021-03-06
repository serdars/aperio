var React = require('react');
var ReactPropTypes = React.PropTypes;
var Link = require('react-router').Link;

var TimelineItems = require('./TimelineItems.react');
var OrgTabsMixin = require('../mixins/OrgTabsMixin');
var Router = require('react-router');
var Navigation = Router.Navigation;

var OrgConstruction = React.createClass({
  mixins: [Navigation, OrgTabsMixin],

  render: function() {
    return (
      <div className="row">
        {this.renderTabs()}
        <div className="organization-main-view">
          This part is under construction.
        </div>
      </div>
    );
  },
});

module.exports = OrgConstruction;
