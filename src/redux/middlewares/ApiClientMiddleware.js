export default function ApiClientMiddleware(client) {
  // eslint-disable-next-line arrow-body-style
  return ({ dispatch, getState }) => {
    return next => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise.then(
        result => next({ ...rest, result, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE })
      ).catch((error) => {
        console.error('ApiClientMiddleware ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });

      return actionPromise;
    };
  };
}
