import React from 'react';
import {NavLink} from 'fluxible-router';

const ListItem = React.createClass({
  propTypes: {
    route: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    name: React.PropTypes.string
  },
  render: function() {
    return (
      <li>
        <NavLink routeName={this.props.route} navParams={{id: this.props.id}}>{this.props.name}</NavLink>
      </li>
    );
  }
});

export default ListItem;