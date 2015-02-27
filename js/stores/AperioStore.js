var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../constants/AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _orgs = {};

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
  getAllOrganizations: function() {
    return _orgs;
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
