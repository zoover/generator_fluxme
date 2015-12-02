// Load actions for routes when needed
import loadSampleList from '../actions/loadSampleList';
import loadSampleItem from '../actions/loadSampleItem';
import loadUserList from '../actions/loadUserList';
import loadUserItem from '../actions/loadUserItem';

// Load component handlers
import SampleListView from '../components/sampleList/SampleListView.jsx';
import SampleItemView from '../components/sampleItem/SampleItemView.jsx';
import UserListView from '../components/userList/UserListView.jsx';
import UserItemView from '../components/userItem/UserItemView.jsx';

// Define fluxible route object
const routes = {
  sampleList: {
    method: 'GET',
    path: '/',
    handler: SampleListView,
    action: loadSampleList
  },
  sampleItem: {
    method: 'GET',
    path: '/sample/:id',
    handler: SampleItemView,
    action: loadSampleItem
  },
  userList: {
    method: 'GET',
    path: '/users',
    handler: UserListView,
    action: loadUserList
  },
  userItem: {
    method: 'GET',
    path: '/users/:id',
    handler: UserItemView,
    action: loadUserItem
  }
};

export default routes;
