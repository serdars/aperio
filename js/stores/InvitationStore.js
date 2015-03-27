var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../AperioConstants').ActionTypes;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _suggestions = [ ];
var _invitation = null;

var InvitationStore = assign({}, EventEmitter.prototype, {
  // Accessor methods
  getSuggestions: function() {
    return _suggestions;
  },

  getInvitation: function() {
    return _invitation;
  },

  reset: function() {
    _suggestions = [ ];
    _invitaiton = null;
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
    case ActionTypes.USER_SEARCH_RESPONSE:
      _invitation = null;
      _suggestions = action.suggestions;
      InvitationStore.emitChange();
      break;

    case ActionTypes.USER_INVITED:
      _suggestions = [ ];
      _invitation = action.invitation;
      InvitationStore.emitChange();

    default:
      // no op
  }
});

InvitationStore.setMaxListeners(20);

module.exports = InvitationStore;
