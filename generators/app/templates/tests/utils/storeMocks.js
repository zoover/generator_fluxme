import {createMockActionContext} from 'fluxible/utils';

class MockDispatcher {

  constructor(store) {
    this.actionContext = createMockActionContext({
      stores: [store]
    });
    this.store = this.actionContext.getStore(store);
  }

  getStore() {
    return this.store;
  }

  dispatch(actionName, payload) {
    this.actionContext.dispatch(actionName, payload);
  }
}

module.exports = {
  MockDispatcher: MockDispatcher
};
