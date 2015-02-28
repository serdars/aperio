var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../constants/AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var orgIds = 0;
function Organization (name, motto, groups) {
  this.id = orgIds;
  orgIds = orgIds + 1;

  this.name = name;
  this.groups = groups;
  this.motto = motto;
}

var groupIds = 0;
function Group (name, motto, isVisible, isPrivate, notifications) {
  this.id = groupIds;
  groupIds = groupIds + 1;

  this.name = name;
  this.motto = motto;
  this.isVisible = isVisible;
  this.isPrivate = isPrivate;
  this.notifications = notifications;
}

function User (name, email, organizations) {
  this.name = name;
  this.email = email;
  this.organizations = organizations;

  this.isMember = function(groupId) {
    return (Math.random() < 0.25);
  };
}

function getNotifications() {
  return Math.floor(Math.random() * 8);
}

function getOrgGroups() {
  return [
    new Group(
      "All Members",
      "Everyone in the organization",
      true, false, getNotifications()
    ),
    new Group(
      "Admins",
      "Admins of the organization",
      false, true, getNotifications()
    ),
    new Group(
      "Volunteers",
      "Valuable Volunteers",
      true, true, getNotifications()
    ),
    new Group(
      "Board",
      "Board of our Organization",
      true, true, getNotifications()
    )
  ]
}

var _currentUser = new User("bendito", "bendito@gmail.com",
  [
    new Organization(
      "Bill & Melinda Gates Foundation",
      "Making the world HEALTHY",
      getOrgGroups()
    ),
    new Organization(
      "501 Commons",
      "Making NPOs faster, stronger, more impactful",
      getOrgGroups()
    ),
    new Organization(
      "Crooked Trails",
      "Travel purposefully",
      getOrgGroups()
    ),
    new Organization(
      "Fusion IQ",
      "Tech consulting for non-profits",
      getOrgGroups()
    ),
    new Organization(
      "Aperio",
      "Meaningful Engagement Platform",
      getOrgGroups()
    ),
  ]
);

function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _orgs[id] = {
    id: id,
    text: text
  };
}

function update(id, updates) {
  _orgs[id] = assign({}, _orgs[id], updates);
}

function destroy(id) {
  delete _orgs[id];
}

var AperioStore = assign({}, EventEmitter.prototype, {
  getCurrentUser: function() {
    return _currentUser;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AperioConstants.ORG_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      AperioStore.emitChange();
      break;

    case AperioConstants.ORG_UPDATE:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
      }
      AperioStore.emitChange();
      break;

    case AperioConstants.ORG_DESTROY:
      destroy(action.id);
      AperioStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AperioStore;
