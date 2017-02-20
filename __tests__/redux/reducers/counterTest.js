import test from 'ava'
import reducer, {initialState, increment} from '../../../src/redux/reducers/counter'
import {reducerTest} from 'redux-ava'

test('test with default action', t => {
  const state = reducer(undefined)
  t.deepEqual(state, initialState);
})

test('counter reducer handle increment', reducerTest(
  reducer,
  {count: 0},
  increment(),
  {count: 1}
))
