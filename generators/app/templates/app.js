import Fluxible from 'fluxible';
import MainComponent from './components/Main.jsx';
// Isomorphic restful services plugin - its magic!
// This will enable to share the same services/api calls between server and client
import fetchr from 'fluxible-plugin-fetchr';
import registerStores from './config/stores';

const fetchrInstance = fetchr({
  // Internal name to make the calls,
  // Name it whatever suits you best
  xhrPath: '/api'
});
const app = new Fluxible({
  component: MainComponent
});

registerStores(app);

// Plug new fetcher instance to the app
app.plug(fetchrInstance);

export default app;
