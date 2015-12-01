import {expect} from 'chai';
import StoreToTest from '../../app/stores/userStore';
import {MockDispatcher} from '../utils/storeMocks';
import actions from '../../app/config/actions';

describe('userStore', function() {
  let sut;  // store = SystemUnderTest
  let dispatcherMock;

  beforeEach(function() {
    dispatcherMock = new MockDispatcher(StoreToTest);
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

  describe('getById', function() {
    it('should return empty user after store initialization', function() {
      // arrange
      const someUserId = 23;

      // act
      const result = sut.getById(someUserId);

      // assert
      expect(result).to.be.empty;
    });

    it('should return empty user if userId not found', function() {
      // arrange
      const testUserArray = [{id: 1, login: 'test'}];
      const inexistingId = 2;
      dispatcherMock.dispatch(actions.USER_LIST_LOADED, {users: testUserArray});

      // act
      const result = sut.getById(inexistingId);

      // assert
      expect(result).to.be.empty;
    });

    it('should return correct user if userId found', function() {
      // arrange
      const testUserArray = [{id: 1, login: 'test'}];
      const existingId = 1;
      dispatcherMock.dispatch(actions.USER_LIST_LOADED, {users: testUserArray});

      // act
      const result = sut.getById(existingId);

      expect(result).to.eql(testUserArray[0]);
    });
  });

  describe('handle USER_LIST_LOADED', function() {
    it('should return only last received array on successive dispatch', function() {
      // arrange
      const firstUserArray = [{id: 1, login: 'test'}];
      const secondUserArray = [{id: 2, login: 'the second user'}];

      // act
      dispatcherMock.dispatch(actions.USER_LIST_LOADED, {users: firstUserArray});
      dispatcherMock.dispatch(actions.USER_LIST_LOADED, {users: secondUserArray});
      const result = sut.getAll();

      // assert
      expect(result).to.eql(secondUserArray);
    });
  });

  describe('dehydrate', function() {
    it('should return serialized state of user store', function() {
      const userArray = [{id: 1, login: 'test'}];
      const currentId = 1;

      sut.getAll = sinon.stub().returns(userArray);
      sut.getCurrentId = sinon.stub().returns(currentId);

      expect(sut.dehydrate()).to.eql({
        users: userArray,
        currentId: currentId
      });
    });
  });

  describe('rehydrate', function() {
    it('should set the current state from the serialized state', function() {
      const state = {
        users: [{id: 2, login: 'test'}],
        currentId: 2
      };

      sut.rehydrate(state);

      expect(sut.dehydrate()).to.eql(state);
    });
  });
});
