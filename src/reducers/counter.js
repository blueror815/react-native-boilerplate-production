import * as Config from '../config';
const INCREMENT = `${Config.Namespace}/counter/INCREMENT`;

const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case INCREMENT:
      const { count } = state;
      return {
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: INCREMENT
  };
}
