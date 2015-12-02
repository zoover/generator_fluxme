import {expect} from 'chai';
import StoreToTest from '../../app/stores/userStore';
import {MockDispatcher} from '../utils/storeMocks';

describe('userStore', function() {
  let store;  // store = SystemUnderTest
  let dispatcherMock;

  beforeEach(function() {
    dispatcherMock = new MockDispatcher(StoreToTest);
    store = dispatcherMock.getStore();
  });
  
  afterEach(function() {
    store = undefined;
  });

  describe('getAll', function() {
    it('should return empty array after store initialization', function() {
      // act
      const result = store.getAll();

      // assert
      expect(result).to.be.empty;
    });
  });
});
