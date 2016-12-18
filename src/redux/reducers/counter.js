import * as Config from 'app/config';

const INCREMENT = `${Config.Namespace}/counter/INCREMENT`;
const INCREMENT_SUCCESS = `${Config.Namespace}/counter/INCREMENT_SUCCESS`;
const INCREMENT_FAILURE = `${Config.Namespace}/counter/INCREMENT_FAILURE`;

const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case INCREMENT_SUCCESS:
      const { count } = state;
      console.log(action.result);
      return {
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    types: [INCREMENT, INCREMENT_SUCCESS, INCREMENT_FAILURE],
    promise: client => client.get('https://jsonplaceholder.typicode.com/posts')
  };
}
