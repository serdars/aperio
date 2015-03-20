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

    default:
      // no op
  }
});

OrganizationStore.setMaxListeners(20);

module.exports = OrganizationStore;
