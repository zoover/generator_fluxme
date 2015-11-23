import BaseStore from 'fluxible/addons/BaseStore';

class UserStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.users = new Map();
  }

  loadUsers(payload) {
    payload.users.map((user) => {
      this.addUpdateUser(user);
    });
    this.emitChange();
  }

  loadUser(payload) {
    this.loadUsers({users: [payload.user]});
  }

  addUpdateUser(user) {
    // more complicated behaviour could be added here,
    // e.g. compare the properties of the old user with
    // the new one, if an old one exists
    this.users.set(user.login, user);
  }

  getAll() {
    return Array.from(this.users.values());
  }

  getById(id) {
    return this.users.get(id);
  }

  dehydrate() {
    return {
      users: this.users
    };
  }

  rehydrate(state) {
    this.users = new Map(state.users);
  }
}

UserStore.storeName = 'UserStore';
UserStore.handlers = {
  'USER_LIST_LOADED': 'loadUsers',
  'USER_ITEM_LOADED': 'loadUser'
};

export default UserStore;
