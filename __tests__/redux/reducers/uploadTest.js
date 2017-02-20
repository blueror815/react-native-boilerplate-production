import test from 'ava'
import reducer, {initialState, setProgress} from '../../../src/redux/reducers/upload'
import {reducerTest} from 'redux-ava'

test('test with default action', t => {
  const state = reducer(undefined)
  t.deepEqual(state, initialState);
})

test('upload reducer handle setProgress', reducerTest(
  reducer,
  {progress: 0},
  setProgress(0.5),
  {progress: 0.5}
))
