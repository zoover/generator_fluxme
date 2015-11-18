import Fluxible from 'fluxible';
import {RouteStore} from 'fluxible-router';
import routes from './config/routes';
import MainComponent from './components/Main.jsx';
// Isomorphic restful services plugin - its magic!
// This will enable to share the same services/api calls between server and client
import fetchr from 'fluxible-plugin-fetchr';

const fetchrInstance = fetchr({
  // Internal name to make the calls,
  // Name it whatever suits you best
  xhrPath: '/api'
});
const app = new Fluxible({
  component: MainComponent,
});

import registerStores from './config/stores';
registerStores(app);

app.registerStore(RouteStore.withStaticRoutes(routes));

// Plug new fetcher instance to the app
app.plug(fetchrInstance);

export default app;
