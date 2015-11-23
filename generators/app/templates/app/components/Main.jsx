import React from 'react';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import {handleHistory} from 'fluxible-router';
import provideContext from 'fluxible-addons-react/provideContext';

let Main = React.createClass({
  propTypes: {
    currentRoute: React.PropTypes.object,
    context: React.PropTypes.object.isRequired,
    isNavigateComplete: React.PropTypes.bool
  },
  contextTypes: {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  },
  render: function() {
    const Handler = this.props.currentRoute.get('handler');
    const params = this.props.currentRoute.get('params').toJS();

    return (
      <div>
        <Helmet title="React Fluxible Boilerplate"/>
        <p>
          React Fluxible Boilerplate menu
          &nbsp;
          <NavLink routeName="sampleList">Sample list</NavLink>
          &nbsp;
          <NavLink routeName="userList">User list</NavLink>
        </p>
        <Handler isLoading={!this.props.isNavigateComplete} {...params}/>
      </div>
    );
  }
});

Main = handleHistory(Main);
Main = provideContext(Main);

export default Main;
