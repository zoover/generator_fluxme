import React from 'react';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import {handleHistory} from 'fluxible-router';
import provideContext from 'fluxible-addons-react/provideContext';
import Container from './_common/Container.jsx';
import Row from './_common/Row.jsx';
import Col from './_common/Col.jsx';
import {t} from '../config/locale';

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
      <Container>
        <Row>
          <Helmet
            title={t('general.title')}
            meta={[{name: 'description', content: t('general.description')}]} />
          <Col width="sm-6">
            <h1>{t('general.title')}</h1>
            <ul>
              <li><NavLink routeName="sampleList">{t('samples.list')}</NavLink></li>
              <li><NavLink routeName="userList">{t('users.list')}</NavLink></li>
            </ul>
          </Col>
          <Col width="sm-6">
            <Handler isLoading={!this.props.isNavigateComplete} {...params}/>
          </Col>
        </Row>
      </Container>
    );
  }
});

Main = handleHistory(Main);
Main = provideContext(Main);

export default Main;
