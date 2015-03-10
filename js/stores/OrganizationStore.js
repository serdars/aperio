var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _organization = null;
var _state = null;
var _error = null;

var OrganizationStore = assign({}, EventEmitter.prototype, {
  // Accessor methods
  getOrganization: function(id) {
    return {
      item: _organization,
      state: _state,
      error: _error
    };
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
      if (action.data.type == AperioConstants.ITEM_TYPE_ORGANIZATION) {
        _state = AperioConstants.ITEM_STATE_LOADING;
        _error = null;
        OrganizationStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_LOADED:
    case AperioConstants.ACTION_CREATED:
      if (action.data.type == AperioConstants.ITEM_TYPE_ORGANIZATION) {
        if (action.data.success) {
          _state = AperioConstants.ITEM_STATE_DONE;
          _error = null;
          _organization = action.data.item;
        } else {
          _state = AperioConstants.ITEM_STATE_ERROR;
          _error = action.data.item;
        }
        OrganizationStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_CREATING:
      if (action.data.type == AperioConstants.ITEM_TYPE_ORGANIZATION) {
        _state = AperioConstants.ITEM_STATE_LOADING;
        _error = null;
        _item = action.data.data;
        OrganizationStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = OrganizationStore;
