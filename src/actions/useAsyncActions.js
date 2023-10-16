import { useCallback, useReducer } from 'react';

export function useAsyncAction(func, onSuccess, onError) {
  const initialState = {
    loading: false,
    success: false,
    users: [],
    error: null,
  };

  const ActionType = {
    FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
    FETCH_MORE_USERS: 'FETCH_MORE_USERS',
    CHANGE_USERS_REQUEST: 'CHANGE_USERS_REQUEST',
    CHANGE_USERS_SUCCESS: 'CHANGE_USERS_SUCCESS',
  };

  function buildReducer() {
    return (state, action) => {
      switch (action.type) {
        case ActionType.FETCH_USERS_SUCCESS:
          return {
            ...state,
            loading: false,
            users: [...state.users, ...action.payload],
            error: null,
          };
        case ActionType.CHANGE_USERS_SUCCESS:
          return {
            ...state,
            loading: false,
            users: action.payload,
            error: null,
          };
        case ActionType.FETCH_USERS_FAILURE:
          return {
            ...state,
            loading: false,
            users: [],
            error: action.payload,
          };
        default:
          throw new Error('Un-Implemented action type');
      }
    };
  }

  const [state, dispatch] = useReducer(buildReducer(), initialState);

  const action = useCallback(
    async (...args) => {
      //dispatch({ type: LoadingStateActionType.FETCH_USERS_SUCCESS });

      try {
        const data = await func(...args);
        dispatch({ type: ActionType.FETCH_USERS_SUCCESS, data });

        if (onSuccess) {
          onSuccess(data, args);
        }

        return data;
      } catch (err) {
        dispatch({ type: ActionType.FETCH_USERS_FAILURE, error: err });

        if (onError) {
          onError(err);
        }
      }
    },
    [func, onError, onSuccess]
  );

  //console.log("here");
  return [
    action,
    state.loading,
    {
      users: state.users,
      data: state.data,
      error: state.error,
      success: state.success,
    },
  ];
}