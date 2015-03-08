var React = require('react');
var ReactPropTypes = React.PropTypes;
var AperioActions = require('../actions/AperioActions');
var AperioApi = require('../AperioApi');

var AperioTextInput = require('./AperioTextInput.react');

var NewOrganization = React.createClass({

  _onSubmit: function(e) {
    e.preventDefault();

    var name = this.refs.name.getDOMNode().value.trim();
    var motto = this.refs.motto.getDOMNode().value.trim();

    AperioApi.createOrganization({
      name: name, motto: motto
    });
    AperioActions.changeUrl("#/timeline", true);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-3 col-sm-6">
          <form onSubmit={this._onSubmit}>
            <div className="form-group">
              <AperioTextInput
                type="text" className="form-control"
                id="name" placeholder="Organization Name"
                ref="name"
              />
            </div>
            <div className="form-group">
              <AperioTextInput
                type="motto" className="form-control"
                id="motto" placeholder="Motto"
                ref="motto"
              />
            </div>
            <button type="submit" className="btn btn-primary center-block">
              Create Organization
            </button>
          </form>
        </div>
      </div>
    );
  },
});

module.exports = NewOrganization;
