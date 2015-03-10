// Mix-in to the top-level component to capture `click`
// events on all links and turn them into action dispatches;
// also manage HTML5 history via pushState/popState
var Routing = {
  getCurrentUrl: function() {
    return document.location.toString().replace(document.location.origin, '');
  },

  componentDidMount: function() {
    // Some browsers have some weirdness with firing an extra 'popState'
    // right when the page loads
    var firstPopState = true;

    // Intercept all bubbled click events on the app's element
    this.getDOMNode().addEventListener('click', this._handleRouteClick);

    window.onpopstate = function(e) {
      if (firstPopState) {
        firstPopState = false;
        return;
      }
      var path = this.getCurrentUrl();
      this.handleRouteChange(path, true);
    }.bind(this);
  },

  componentWillUnmount: function() {
    this.getDOMNode().removeEventListener('click', this._handleRouteClick);
    window.onpopstate = null;
  },

  _handleRouteClick: function(e) {
    var target = e.target;

    // figure out if we clicked on an `a` tag
    while(target && target.tagName !== 'A') {
      target = target.parentNode;
    }

    if (!target) return;

    // if the user was holding a modifier key, don't intercept
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
      e.preventDefault();

      var href = target.attributes.href.value;
      this.handleRouteChange(href, false);
    }
  },
};

module.exports = Routing;
