var React = require('react');
var cx = require('react/lib/cx');

var Router = require('react-router');
var Link = Router.Link;

var _orgId = null;
var _tab = null;
var _availableTabs = {
  timeline: "Timeline",
  conversations: "Conversations",
  members: "Members",
  invites: "Invitations"
};

var OrgTabsMixin = {
  statics: {
    willTransitionTo: function(transition, params) {
      _orgId = params.id;
      _tab = transition.path.split("/").pop();

      keys = Object.keys(_availableTabs);
      if (keys.indexOf(_tab) < 0) {
        _tab = keys[0];
      }
    }
  },

  setActive: function(tabName) {
    return cx({
      "active": (tabName == _tab)
    });
  },

  renderTabs: function() {
    var tabs = [ ];
    for(var key in _availableTabs) {
      tabs.push(
        <li role="presentation" className={this.setActive(key)}>
          <Link to={key} params={{id: _orgId}}>
            {_availableTabs[key]}
          </Link>
        </li>
      );
    }
    return (<ul className="nav nav-tabs nav-justified"> {tabs} </ul>);
  }
};

module.exports = OrgTabsMixin;
