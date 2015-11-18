import sampleListStore from '../stores/sampleListStore';
import sampleItemStore from '../stores/sampleItemStore';
import userListStore from '../stores/userListStore';
import userItemStore from '../stores/userItemStore';

export default function registerStores(app) {
  app.registerStore(sampleListStore);
  app.registerStore(sampleItemStore);
  app.registerStore(userListStore);
  app.registerStore(userItemStore);
}