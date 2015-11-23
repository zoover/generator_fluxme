import BaseStore from 'fluxible/addons/BaseStore';

class SampleStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.samples = new Map();
  }

  loadSamples(payload) {
    payload.samples.map((sample) => {
      this.addUpdateSample(sample);
    });
    this.emitChange();
  }

  loadSample(payload) {
    this.loadSamples({samples: [payload.sample]});
  }

  addUpdateSample(sample) {
    // more complicated behaviour could be added here,
    // e.g. compare the properties of the old sample with
    // the new one, if an old one exists
    this.samples.set(sample.id, sample);
  }

  getAll() {
    return Array.from(this.samples.values());
  }

  getById(id) {
    return this.samples.get(id);
  }

  dehydrate() {
    return {
      samples: this.samples
    };
  }

  rehydrate(state) {
    this.samples = new Map(state.samples);
  }
}

SampleStore.storeName = 'SampleStore';
SampleStore.handlers = {
  'SAMPLE_LIST_LOADED': 'loadSamples',
  'SAMPLE_ITEM_LOADED': 'loadSample'
};

export default SampleStore;
