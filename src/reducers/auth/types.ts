export interface authReducerStateType {
  isLoading: boolean,
  isSignout: boolean,
  userToken: string | null,
}
export interface authReducerActionType {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT',
  token: string | null
}