import {expect} from 'chai';
import <%= storeClassName %> from '../../app/stores/<%= storeFileName %>';
import {MockDispatcher} from '../utils/storeMocks';
import actions from '../../app/config/actions';

describe('<%= storeClassName %>', function() {
  let sut;  // store = SystemUnderTest
  let dispatcherMock;

  beforeEach(function() {
    dispatcherMock = new MockDispatcher(<%= storeClassName %>);
    sut = dispatcherMock.getStore();
  });

  afterEach(function() {
    sut = undefined;
  });

  describe('getAll', function() {
    it('should return empty array after store initialization', function() {
      // act
      const result = sut.getAll();

      // assert
      expect(result).to.be.empty;
    });
  });
  
});
