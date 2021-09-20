import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Linking,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {Fumi} from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {POST} from '../../api/fetch';
import ButtonOutline from '../../components/UI/Buttons/ButtonOutline';
import ButtonSolid from '../../components/UI/Buttons/ButtonSolid';
import CheckBox from '../../components/UI/Checkbox/Checkbox';
import Text from '../../components/UI/Text/Text';
import {COLORS, SHADOW, URLS} from '../../constants';
import {AuthContext, AuthContextType} from '../../context/Auth';
import {AuthNavProps} from '../../navigation/types';

const OtpScreen = ({route}: AuthNavProps<'Otp'>) => {
  const context = React.useContext(AuthContext) as AuthContextType;

  const otpInputRef = React.createRef<Fumi>();
  const nameInputRef = React.createRef<Fumi>();

  const [otp, setOtp] = React.useState<string | undefined>();
  const [name, setName] = React.useState<string | undefined>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(true);
  const [allowResendOTP, setAllowResendOTP] = React.useState<boolean>(false);
  const [allowLogin, setAllowLogin] = React.useState<boolean>(false);

  const [timeLeft, setTimeLeft] = React.useState<number | undefined>(60);

  React.useEffect(() => {
    if (!timeLeft) {
      setTimeLeft(undefined);
      setAllowResendOTP(true);
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const {phone, isNewCustomer} = route.params;

  const allInputsValid = (
    latestOtp: string | undefined = otp,
    latestName: string | undefined = name,
    latestCheck: boolean = termsAccepted,
  ) => {
    if (isNewCustomer) {
      if (
        latestName &&
        latestOtp?.length === 6 &&
        latestName?.length > 2 &&
        latestCheck
      ) {
        return true;
      }
    } else if (latestOtp?.length === 6 && latestCheck) {
      return true;
    }
    return false;
  };

  const termsAndConditions = () => {
    Linking.openURL(URLS.WEBSITE_URL + 'terms-and-conditions');
  };
  const privacyPolicy = () => {
    Linking.openURL(URLS.WEBSITE_URL + 'privacy-policy');
  };

  const OTPChanged = (newOtp: string | undefined) => {
    setOtp(newOtp);
    if (allInputsValid(newOtp, name)) {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  };
  const NameChanged = (newName: string | undefined) => {
    setName(newName);
    if (allInputsValid(otp, newName)) {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  };
  const termsCheckBoxChanged = () => {
    setTermsAccepted(() => !termsAccepted);

    if (allInputsValid(otp, name, !termsAccepted)) {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  };

  const onPressResendOTP = async () => {
    setTimeLeft(120);
    setAllowResendOTP(false);
    await POST('create-otp', undefined, {phone: phone});
  };
  const onPressLogin = async () => {
    if (context && otp) {
      let checkOTP;
      if (isNewCustomer && name) {
        checkOTP = await context.signUp({name, phone, otp});
      } else {
        checkOTP = await context.signIn({phone, otp});
      }
      if (checkOTP === 'Incorrect OTP') {
        incorrectOTPAlert();
      }
    }
  };

  const incorrectOTPAlert = () =>
    Alert.alert(
      'Incorrect or Expired OTP ',
      "Please try again by clicking on 'Resend OTP'",
      [
        {
          text: 'Retry',
          onPress: () => {
            setOtp(undefined);
          },
        },
      ],
    );

  return (
    <SafeAreaView style={styles.container}>
      {/* LOGO, NAME AND TEXT*/}
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{aspectRatio: 1, maxHeight: 100, maxWidth: 100}}
          source={require('../../assets/logos/logo.png')}
        />
        <Text style={{fontSize: 30, marginTop: 10}}>MyApp</Text>
        <Text style={{color: COLORS.SECONDARY}}>
          Secure 2-Factor Authentication
        </Text>
      </View>

      {/* INPUT FIELDS */}
      <View
        style={{justifyContent: 'space-evenly', flex: 2, marginHorizontal: 15}}>
        <View style={SHADOW.MEDIUM}>
          <Fumi
            ref={otpInputRef}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (isNewCustomer) {
                otpInputRef.current?.focus();
              } else if (allInputsValid()) {
                onPressLogin();
              }
            }}
            label={'OTP'}
            iconClass={MaterialIcons}
            iconName={'lock'}
            onChangeText={OTPChanged}
            value={otp}
            maxLength={6}
            keyboardType="numeric"
            iconColor={COLORS.PRIMARY}
            autoFocus
            iconSize={20}
            inputPadding={20}
            labelStyle={{
              fontFamily: 'Nunito-Regular',
            }}
            style={{
              padding: 0,
              borderRadius: 5,
              ...SHADOW.MEDIUM,
            }}
          />
        </View>

        {isNewCustomer && (
          <View style={SHADOW.MEDIUM}>
            <Fumi
              ref={nameInputRef}
              onSubmitEditing={() => {
                if (allInputsValid()) {
                  onPressLogin();
                }
              }}
              label={'Full Name'}
              iconClass={MaterialIcons}
              iconName={'person'}
              onChangeText={NameChanged}
              value={name}
              maxLength={50}
              returnKeyType={'done'}
              iconColor={COLORS.PRIMARY}
              iconSize={20}
              inputPadding={20}
              labelStyle={{
                fontFamily: 'Nunito-Regular',
              }}
              style={{
                padding: 0,
                borderRadius: 5,
                ...SHADOW.MEDIUM,
              }}
            />
          </View>
        )}
      </View>

      {/* AGREEMENT AND BUTTONS */}
      <View style={{flex: 2, marginHorizontal: 15}}>
        {/* Agreement feilds */}
        <View style={[styles.checkboxView]}>
          <CheckBox
            selected={termsAccepted}
            size={34}
            color={COLORS.PRIMARY}
            onPress={termsCheckBoxChanged}
          />
          <Text style={styles.text}>
            I Agree to the
            <Text onPress={termsAndConditions} style={styles.link}>
              {' '}
              Terms of use
            </Text>{' '}
            and
            <Text onPress={privacyPolicy} style={styles.link}>
              {' '}
              Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={{}}>
          {/* login button */}
          <ButtonSolid
            title={'Login'}
            style={{borderRadius: 5, padding: 15}}
            disabled={!allowLogin}
            onPress={onPressLogin}
          />

          {/* Resend otp */}
          <ButtonOutline
            title={timeLeft ? `Resend OTP in ${timeLeft}` : 'Resend OTP'}
            style={{marginTop: 20, padding: 15}}
            disabled={!allowResendOTP}
            onPress={onPressResendOTP}
          />
        </View>
      </View>

      {/* Bottom Image */}
      <View style={{flex: 2}}>
        <Image
          source={require('../../assets/images/auth.png')}
          style={{resizeMode: 'contain', flex: 1}}
          width={Math.round(Dimensions.get('window').width)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  text: {
    marginLeft: 5,
    fontSize: 15,
  },
  checkboxView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 21,
  },
  link: {
    color: COLORS.SECONDARY,
  },

  logo: {
    width: 50,
    height: 50,
  },
});

export default OtpScreen;
