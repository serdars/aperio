var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../AperioConstants').ActionTypes;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _user = null;

var UserStore = assign({}, EventEmitter.prototype, {
  getUser: function() {
    return _user;
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
  switch(action.type) {
    case ActionTypes.INIT_APP:
    case ActionTypes.USER_REGISTER:
    case ActionTypes.USER_LOGIN:
      _user = action.user;
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LOGOUT:
      _user = null;
      UserStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = UserStore;
