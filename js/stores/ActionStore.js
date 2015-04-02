var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../AperioConstants').ActionTypes;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _errors = { };

var ActionStore = assign({}, EventEmitter.prototype, {
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
  switch(action.type) {
    case ActionTypes.CONVERSATION_CREATE_DONE:
      ActionStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ActionStore;
