var React = require('react');
var ReactPropTypes = React.PropTypes;

var AperioStore = require('../stores/AperioStore');
var AperioApi = require('../AperioApi');

var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Badge = require('react-bootstrap').Badge;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var GROUP_FILTER = "FILTER_GROUP"
var ORG_FILTER = "FILTER_ORG"

var TimelineFilters = React.createClass({

  propTypes: {
    onFilter: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      user: null,
      filteredBy: null,
      filterOrg: null,
      filterGroup: null
    };
  },

  componentDidMount: function() {
    AperioStore.addChangeListener(this._onChange);
    AperioApi.loadUser();
  },

  componentWillUnmount: function() {
    AperioStore.removeChangeListener(this._onChange);
  },

  // This will need to take the group or the organization.
  _getActionToolbar: function() {
    return (
      <ButtonToolbar className="btn-group-xs">
        <Button bsStyle="primary">Join</Button>
        <Button bsStyle="primary">Manage</Button>
        <Badge> 5 </Badge>
      </ButtonToolbar>
    )
  },

  _getHeaderDiv: function() {
    var headerElements = [ ];

    if(this.state.filteredBy == ORG_FILTER || this.state.filteredBy == GROUP_FILTER) {
      headerElements.push(<a href="#" onClick={this._resetFilters}> BACK </a>);
      headerElements.push(<span> | {this.state.filterOrg.name} </span>);
    } else {
      headerElements.push(<span> Your Organizations </span>);
    }

    return (<div> <h4> {headerElements} </h4> </div>);
  },

  render: function() {
    // Return empty div if the user is not set yet.
    if (this.state.user == null) {
      return(<div />);
    }

    var viewListItems = [ ];
    var filterList;

    if(this.state.filteredBy == ORG_FILTER || this.state.filteredBy == GROUP_FILTER) {
      // We will show the groups
      filterList = this.state.filterOrg.groups;
    } else {
      // We will show the organizations
      filterList = this.state.user.organizations;
    }

    for(var key in filterList) {
      viewListItems.push(
        <ListGroupItem href="#" header={filterList[key].name}
          onClick={this._listItemClick.bind(this, key)}
        >
          {filterList[key].motto}
          {this._getActionToolbar()}
        </ListGroupItem>
      )
    }

    return (
      <div>
        {this._getHeaderDiv()}
        <ListGroup>
          {viewListItems}
        </ListGroup>
      </div>
    );
  },

  _onChange: function() {
    this.setState({
      user: AperioStore.getCurrentUser()
    });
  },

  _resetFilters: function() {
    var resetFilters = {
      filteredBy: null,
      filterOrg: null,
      filterGroup: null
    };
    this.props.onFilter(resetFilters);
    this.setState(resetFilters);
  },

  _listItemClick: function(key) {
    var nextState;

    if(this.state.filteredBy == ORG_FILTER) {
      nextState = {
        filteredBy: GROUP_FILTER,
        filterGroup: this.state.filterOrg.groups[key]
      };
    } else if (this.state.filteredBy == GROUP_FILTER) {
      nextState = {
        filterGroup: this.state.filterOrg.groups[key]
      };
    } else {
      nextState = {
        filteredBy: ORG_FILTER,
        filterOrg: this.state.user.organizations[key]
      };
    }

    this.props.onFilter(nextState);
    this.setState(nextState);
  }
});

module.exports = TimelineFilters;
