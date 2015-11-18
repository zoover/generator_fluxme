import BaseStore from 'fluxible/addons/BaseStore';

class SampleItemStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.sample = null;
  }

  handleSampleItemLoad(payload) {
    this.sample = payload.sample;
    this.emitChange();
  }

  getSample() {
    return this.sample;
  }

  dehydrate() {
    return {
      sample: this.sample
    };
  }

  rehydrate(state) {
    this.sample = state.sample;
  }
}

SampleItemStore.storeName = 'SampleItemStore';
SampleItemStore.handlers = {
  'SAMPLE_ITEM_LOAD': 'handleSampleItemLoad',
};

export default SampleItemStore;
