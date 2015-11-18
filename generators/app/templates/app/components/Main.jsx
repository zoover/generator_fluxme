import React from 'react';
import {NavLink} from 'fluxible-router';
import {handleHistory} from 'fluxible-router';
import provideContext from 'fluxible-addons-react/provideContext';

let MainComponent = React.createClass({
  propTypes: {
    currentRoute: React.PropTypes.object.isRequired,
    context: React.PropTypes.object.isRequired,
  },
  render: function() {
    if (this.props.currentRoute === null) {
      return false;
    }
    const Handler = this.props.currentRoute.get('handler');

    return (
      <div>
        <p>
          <NavLink routeName="sampleList">Sample list</NavLink>
          &nbsp;
          <NavLink routeName="userList">User list</NavLink>
        </p>
        <Handler context={this.props.context} />
      </div>
    );
  },
});

MainComponent = handleHistory(MainComponent);
MainComponent = provideContext(MainComponent);

export default MainComponent;
