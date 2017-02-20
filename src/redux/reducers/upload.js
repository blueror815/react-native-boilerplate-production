import * as Config from '../../config';

export const ACTIONS = {
  SET_PROGRESS: `${Config.Namespace}/counter/SET_PROGRESS`
};

export const initialState = {
  progress: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case ACTIONS.SET_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
    default:
      return state;
  }
}

export function setProgress(progress) {
  return {
    type: ACTIONS.SET_PROGRESS,
    progress
  };
}
