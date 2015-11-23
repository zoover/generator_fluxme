import {RouteStore} from 'fluxible-router';
import routes from '../config/routes';
import SampleStore from '../stores/sampleStore';
import UserStore from '../stores/userStore';

export default function registerStores(app) {
  app.registerStore(RouteStore.withStaticRoutes(routes));
  app.registerStore(SampleStore);
  app.registerStore(UserStore);
}