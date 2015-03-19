var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = [ ];
var _state = null;
var _error = null;

var TimelineStore = assign({}, EventEmitter.prototype, {
  // Accessor methods
  getTimeline: function() {
    return _items;
  },

  getState: function() {
    return _state;
  },

  getError: function() {
    return _error;
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
    case AperioConstants.ACTION_LOADING:
      if (action.data.type == AperioConstants.ITEM_TYPE_TIMELINE) {
        _state = AperioConstants.ITEM_STATE_LOADING,
        _error = null
        TimelineStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_LOADED:
      if (action.data.type == AperioConstants.ITEM_TYPE_TIMELINE) {
        if (action.data.success) {
          _state = AperioConstants.ITEM_STATE_DONE;
          _items = action.data.item;
          _error = null;
        } else {
          _state = AperioConstants.ITEM_STATE_ERROR;
          _error = action.data.item;
        }

        TimelineStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = TimelineStore;
