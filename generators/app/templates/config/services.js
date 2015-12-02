import sampleListService from '../services/sampleList';
import sampleItemService from '../services/sampleItem';
import userListService from '../services/userList';
import userItemService from '../services/userItem';

export default function registerServices(app) {
  app.getPlugin('FetchrPlugin').registerService(sampleListService);
  app.getPlugin('FetchrPlugin').registerService(sampleItemService);
  app.getPlugin('FetchrPlugin').registerService(userListService);
  app.getPlugin('FetchrPlugin').registerService(userItemService);
}