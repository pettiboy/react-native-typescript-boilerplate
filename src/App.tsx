import EncryptedStorage from 'react-native-encrypted-storage';

import React from 'react';
import {ActivityIndicator} from 'react-native';
import {POST} from './api/fetch';
// import NotificationHandler from './components/Notification/NotificationHandler';
import {COLORS} from './constants';
import {AuthContext} from './context/Auth';
import {AuthStack, MainStack} from './navigation/Navigation';
import {authReducer, authReducerState} from './reducers/auth';
import NoInternetConnection from './components/NoInternet/NoInternetConnection';
// import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

const App = () => {
  const [state, updateReducerState] = React.useReducer(
    authReducer,
    authReducerState,
  );

  // internet handling
  // const netInfo = useNetInfo();

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: {phone: string; otp: string}) => {
        // post phone and otp to server
        const json = await POST('validate-otp', undefined, {
          phone: data.phone,
          otp: data.otp,
        });
        // if server responds with token then otp was valid
        if (json.token) {
          const userToken = json.token;
          const userId = json.user_id.toString();

          // save token in secure storage
          await EncryptedStorage.setItem('Token', userToken);
          await EncryptedStorage.setItem('UserId', userId);

          updateReducerState({type: 'SIGN_IN', token: userToken});
        } else {
          return 'Incorrect OTP';
        }
      },
      signUp: async (data: {phone: string; otp: string; name: string}) => {
        // post phone, otp and name to server
        const json = await POST('validate-otp', undefined, {
          phone: data.phone,
          otp: data.otp,
          name: data.name,
        });
        // if server responds with token then otp was valid
        if (json.token) {
          const userToken = json.token;
          const userId = json.user_id.toString();

          // save token in secure storage
          await EncryptedStorage.setItem('Token', userToken);
          await EncryptedStorage.setItem('UserId', userId);

          updateReducerState({type: 'SIGN_IN', token: userToken});
        } else if (json.error) {
          return 'Incorrect OTP';
        }
      },
      signOut: async () => {
        try {
          await EncryptedStorage.removeItem('Token');
          await EncryptedStorage.removeItem('UserId');
        } catch (err) {
          console.debug(err);
        }

        updateReducerState({type: 'SIGN_OUT', token: null});
      },
      getToken: () => {
        return state.userToken ? state.userToken : undefined;
      },
    }),
    [state.userToken],
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = '';
      try {
        userToken = await EncryptedStorage.getItem('Token');
      } catch (e) {
        console.log(e);
      }
      updateReducerState({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  // if (!netInfo.isConnected && !state.isLoading) {
  //   return <NoInternetConnection />;
  // }

  if (state.isLoading) {
    return (
      <ActivityIndicator
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        size={'large'}
        color={COLORS.PRIMARY}
      />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {state.userToken === null ? (
        <>
          <AuthStack></AuthStack>
        </>
      ) : (
        <>
          <MainStack></MainStack>
        </>
      )}
    </AuthContext.Provider>
  );
};

export default App;
