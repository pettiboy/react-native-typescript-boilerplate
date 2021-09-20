import { authReducerActionType, authReducerStateType } from './types';

export const authReducer = (state: authReducerStateType, action: authReducerActionType) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default: 
      return state
  }
}

export const authReducerState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
}