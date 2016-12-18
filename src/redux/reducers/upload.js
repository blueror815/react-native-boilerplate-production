import * as Config from 'app/config';

const PROGRESS = `${Config.Namespace}/upload/PROGRESS`;

const initialState = {
  progress: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case PROGRESS:
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
    type: PROGRESS,
    progress
  };
}
