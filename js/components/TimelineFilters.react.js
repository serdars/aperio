var React = require('react');
var ReactPropTypes = React.PropTypes;

var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Badge = require('react-bootstrap').Badge;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var GROUP_FILTER = "FILTER_GROUP"
var ORG_FILTER = "FILTER_ORG"

var TimelineFilters = React.createClass({

  propTypes: {
    user: ReactPropTypes.object.isRequired,
    onFilter: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      filteredBy: null,
      filterOrg: null,
      filterGroup: null
    };
  },

  _getHeaderDiv: function() {
    var headerElements = [ ];
    var mainMessage = "ALL"

    if(this.state.filteredBy == ORG_FILTER || this.state.filteredBy == GROUP_FILTER) {
      headerElements.push(<a href="#" onClick={this._resetFilters}> {mainMessage} </a>);
      headerElements.push(<span> > {this.state.filterOrg.name} </span>);
    } else {
      headerElements.push(<span> {mainMessage} </span>);
    }

    return (<div> <h4> {headerElements} </h4> </div>);
  },

  render: function() {
    if (this.props.user == null) {
      return(<div />);
    }

    var listItems = [ ];
    var visibleFilterList;

    if(this.state.filteredBy == ORG_FILTER || this.state.filteredBy == GROUP_FILTER) {
      visibleFilterList = this.state.filterOrg.groups;
    } else {
      visibleFilterList = this.props.user.organizations;
    }

    for(var key in visibleFilterList) {
      var notificationBadge = (
        <Badge>
          5
        </Badge>
      );

      var actionButtons = [ ];
      actionButtons.push(
        <Button bsStyle="primary">Join</Button>
      );
      actionButtons.push(
        <Button bsStyle="primary">Manage</Button>
      );

      listItems.push(
        <ListGroupItem href="#" header={visibleFilterList[key].name}
          onClick={this._listItemClick.bind(this, key)}
        >
          {visibleFilterList[key].motto}
          <ButtonToolbar className="btn-group-xs">
            {actionButtons}
          </ButtonToolbar>
          {notificationBadge}
        </ListGroupItem>
      )
    }

    return (
      <div>
        {this._getHeaderDiv()}
        <ListGroup>
          {listItems}
        </ListGroup>
      </div>
    );
  },

  _resetFilters: function() {
    var initialState = this.getInitialState();
    this.props.onFilter(initialState);
    this.setState(initialState);
  },

  _listItemClick: function(key) {
    var nextState;

    if(this.state.filteredBy == ORG_FILTER) {
      nextState = {
        filteredBy: GROUP_FILTER,
        filterOrg: this.state.filterOrg,
        filterGroup: this.state.filterOrg.groups[key]
      };
    } else if (this.state.filteredBy == GROUP_FILTER) {
      nextState = {
        filterGroup: this.state.filterOrg.groups[key]
      };
    } else {
      nextState = {
        filteredBy: ORG_FILTER,
        filterOrg: this.props.user.organizations[key]
      };
    }

    this.props.onFilter(nextState);
    this.setState(nextState);
  }
});

module.exports = TimelineFilters;
