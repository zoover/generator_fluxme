import BaseStore from 'fluxible/addons/BaseStore';

class UserListStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.users = [];
  }

  handleUserListLoad(payload) {
    this.users = payload.users;
    this.emitChange();
  }

  getUsers() {
    return this.users;
  }

  dehydrate() {
    return {
      users: this.users
    };
  }

  rehydrate(state) {
    this.users = state.users;
  }
}

UserListStore.storeName = 'UserListStore';
UserListStore.handlers = {
  'USER_LIST_LOAD': 'handleUserListLoad',
};

export default UserListStore;
