var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../constants/AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _currentUser = null;
var _timeline = null;

var AperioStore = assign({}, EventEmitter.prototype, {
  getCurrentUser: function() {
    return _currentUser;
  },

  getCurrentTimeline: function() {
    return _timeline;
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
    case AperioConstants.LOAD_USER:
      _currentUser = action.user;
      AperioStore.emitChange();
      break;

    case AperioConstants.LOAD_TIMELINE:
      _timeline = action.timeline;
      AperioStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AperioStore;
