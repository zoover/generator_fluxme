import BaseStore from 'fluxible/addons/BaseStore';

class SampleListStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.samples = [];
  }

  handleSampleListLoad(payload) {
    this.samples = payload.samples;
    this.emitChange();
  }

  getSamples() {
    return this.samples;
  }

  dehydrate() {
    return {
      samples: this.samples
    };
  }

  rehydrate(state) {
    this.samples = state.samples;
  }
}

SampleListStore.storeName = 'SampleListStore';
SampleListStore.handlers = {
  'SAMPLE_LIST_LOAD': 'handleSampleListLoad',
};

export default SampleListStore;
