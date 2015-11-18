import BaseStore from 'fluxible/addons/BaseStore';

class UserItemStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.user = null;
  }

  handleUserItemLoad(payload) {
    this.user = payload.user;
    this.emitChange();
  }

  getUser() {
    return this.user;
  }

  dehydrate() {
    return {
      user: this.user
    };
  }

  rehydrate(state) {
    this.user = state.user;
  }
}

UserItemStore.storeName = 'UserItemStore';
UserItemStore.handlers = {
  'USER_ITEM_LOAD': 'handleUserItemLoad',
};

export default UserItemStore;
