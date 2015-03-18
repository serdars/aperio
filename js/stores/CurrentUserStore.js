var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _current_user = null;
var _state = null;
var _error = null;

var CurrentUserStore = assign({}, EventEmitter.prototype, {
  // Accessor methods
  getCurrentUser: function() {
    return _current_user;
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

  switch(action.actionType) {
    case AperioConstants.ACTION_LOADING:
      if (action.data.type == AperioConstants.ITEM_TYPE_CURRENT_USER) {
        _state = AperioConstants.ITEM_STATE_LOADING,
        _error = null
        CurrentUserStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_LOADED:
      if (action.data.type == AperioConstants.ITEM_TYPE_CURRENT_USER) {
        if (action.data.success) {
          _state = AperioConstants.ITEM_STATE_DONE;
          _current_user = action.data.item;
          _error = null;
        } else {
          _state = AperioConstants.ITEM_STATE_ERROR;
          _error = action.data.item;
        }

        CurrentUserStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_LOGOUT:
      _current_user = null;
      CurrentUserStore.emitChange();
      break;

    case AperioConstants.ACTION_LOGIN_SUCCESS:
    case AperioConstants.ACTION_REGISTER_SUCCESS:
      _current_user = action.data.user;
      _error = null;
      CurrentUserStore.emitChange();
      break;

    case AperioConstants.ACTION_LOGIN_FAILED:
    case AperioConstants.ACTION_REGISTER_FAILED:
      _current_user = null;
      _error = action.data.error;
      CurrentUserStore.emitChange();
      break;

    case AperioConstants.ACTION_JOINED:
      if (_current_user.id == action.data.membership.user_id) {
        _current_user.memberships.push(action.data.membership.group_id);
        CurrentUserStore.emitChange();
      }
      break;


    default:
      // no op
  }
});

module.exports = CurrentUserStore;
