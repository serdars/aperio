var assign = require('object-assign');
var RouteRecognizer = require('route-recognizer');
var EventEmitter = require('events').EventEmitter;

var AperioDispatcher = require('../AperioDispatcher');
var AperioConstants = require('../AperioConstants');

var CHANGE_EVENT = 'change';

var _currentPage = null;

// Routes
var _router = new RouteRecognizer();
_router.add([{ path: "/", handler: routeTimeline }]);
_router.add([{ path: "#/timeline", handler: routeTimeline }]);
_router.add([{ path: "#/join", handler: routeJoin }]);
_router.add([{ path: "#/organizations/:id", handler: routeOrganization }]);

function routeTimeline() {
  return {
    view: AperioConstants.VIEW_TIMELINE,
    prefetch: {
      type: AperioConstants.ITEM_TYPE_TIMELINE,
      id: ""
    }
  };
}
function routeJoin() {
  return {
    view: AperioConstants.VIEW_JOIN
  };
}
function routeOrganization(href, params) {
  if (params.id == "new") {
    params.id = null;
  }

  return {
    view: AperioConstants.VIEW_ORGANIZATION,
    params: params,
    prefetch: {
      type: AperioConstants.ITEM_TYPE_ORGANIZATION,
      id: params.id
    }
  };
}

function isFullUrl(url) {
  return url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}

var RouteStore = assign({}, EventEmitter.prototype, {
  prefetchForRoute: function(href) {
    var results = _router.recognize(href);
    if (results && results.length) {
      var recognizedRoute = results[0].handler(href, results[0].params);
      return recognizedRoute.prefetch;
    }
    return null;
  },

  navigate: function(href, skipHistory) {
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
AperioDispatcher.register(function(action) {
  switch(action.type) {
    case AperioConstants.ACTION_ROUTE_CHANGE:
      RouteStore.navigate(action.href, action.skipHistory);
      break;

    default:
      // no op
  }
});

module.exports = RouteStore;
