var assign = require('object-assign');
var RouteRecognizer = require('route-recognizer');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AperioConstants = require('../constants/AperioConstants');

var CHANGE_EVENT = 'change';

var _currentPage = null;
var _router = new RouteRecognizer();
_router.add([{ path: "/", handler: routeTimeline }]);
_router.add([{ path: "#/timeline", handler: routeTimeline }]);
_router.add([{ path: "#/join", handler: routeJoin }]);

function routeJoin() {
  return AperioConstants.JOIN_VIEW;
}
function routeTimeline() {
  return AperioConstants.TIMELINE_VIEW;
}

var RouteStore = assign({}, EventEmitter.prototype, {
  handleChangeUrl: function(href, skipHistory) {
    var isFullUrl = function(url) {
      return url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
    }

    // links with a protocol simply change the location
    if (isFullUrl(href)) {
      document.location = href;
    } else {
      var results = _router.recognize(href);
      if (results && results.length) {
        _currentPage = results[0].handler(href, results[0].params);
        if (!skipHistory) history.pushState(href, '', href);
      }

      this.emit("change");
    }
  },

  getCurrentView: function() {
    return _currentPage;
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
  switch(action.actionType) {
    case AperioConstants.ROUTE_CHANGE:
      RouteStore.handleChangeUrl(action.href, action.skipHistory);
      break;

    default:
      // no op
  }
});

module.exports = RouteStore;
