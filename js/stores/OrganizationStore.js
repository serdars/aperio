var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../AperioConstants').ActionTypes;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _organization = null;

var OrganizationStore = assign({}, EventEmitter.prototype, {
  // Accessor methods
  get: function() {
    return _organization;
  },

  reset: function() {
    _organization = null;
  },

  // Event handling methods
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
AperioDispatcher.register(function(action) {
  var text;

  switch(action.type) {
    case ActionTypes.ORGANIZATION_CREATE:
    case ActionTypes.ORGANIZATION_UPDATE:
    case ActionTypes.ORGANIZATION_GET:
      _organization = action.organization;
      OrganizationStore.emitChange();
      break;
    case ActionTypes.GROUP_CREATE:
      if (action.organizationId == _organization.id) {
        _organization.groups.push(action.group);
        OrganizationStore.emitChange();
      }
      break;
    case ActionTypes.GROUP_UPDATE:
      if (action.organizationId == _organization.id) {
        for(var key in _organization.groups) {
          if (_organization.groups[key].id == action.group.id) {
            _organization.groups[key] = action.group;
            OrganizationStore.emitChange();
            break;
          }
        }
      }
      break;

    default:
      // no op
  }
});

OrganizationStore.setMaxListeners(20);

module.exports = OrganizationStore;
