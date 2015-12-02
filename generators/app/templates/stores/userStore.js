import events from '../config/events';
import BaseStore from 'fluxible/addons/BaseStore';

class UserStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this._setUsers([]);
  }

  loadUsersHandler(payload) {
    this._addUsers(payload.users);
    this.emitChange();
  }

  loadUserHandler(payload) {
    this._addUsers([payload.user]);
    this.emitChange();
  }

  getAll() {
    return Array.from(this.users.values());
  }

  getById(id) {
    return this.users.get(id);
  }

  dehydrate() {
    return {
      users: this.getAll()
    };
  }

  rehydrate(state) {
    this._setUsers(state.users);
  }

  _setUsers(usersArray) {
    this.users = new Map();
    this._addUsers(usersArray);
  }

  _addUsers(usersArray) {
    usersArray.map((user) => {
      this.users.set(user.login, user);
    });
  }
}

UserStore.storeName = 'UserStore';
UserStore.handlers = {
  [events.USER_LIST_LOADED]: 'loadUsersHandler',
  [events.USER_ITEM_LOADED]: 'loadUserHandler'
};

export default UserStore;