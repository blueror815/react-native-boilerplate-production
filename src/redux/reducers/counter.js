import * as Config from '../../config';

export const ACTIONS = {
  INCREMENT: `${Config.Namespace}/counter/INCREMENT`,
  INCREMENT_SUCCESS: `${Config.Namespace}/counter/INCREMENT_SUCCESS`,
  INCREMENT_FAILURE: `${Config.Namespace}/counter/INCREMENT_FAILURE`
};

export const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case ACTIONS.INCREMENT:
      const { count } = state;
      return {
        ...state,
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: ACTIONS.INCREMENT
  };
}
