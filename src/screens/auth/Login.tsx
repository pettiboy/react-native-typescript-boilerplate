import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Linking,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

import {COLORS, SHADOW, URLS} from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SmsRetriever from 'react-native-sms-retriever';
import Text from '../../components/UI/Text/Text';
import {Fumi} from 'react-native-textinput-effects';
import ButtonSolid from '../../components/UI/Buttons/ButtonSolid';
import FlatListSlider from '../../components/UI/Slider/FlatListSlider';
import {AuthNavProps} from '../../navigation/types';
import ErrorModal from '../../components/UI/Modals/ErrorModal';

const infoTextArray = ['Example Tag Line'];
const infoTextArrayLength = infoTextArray.length;
const IMAGES = [
  {image: require('../../assets/images/healthy-homemade-food.png')},
];

const LoginScreen = ({navigation, route}: AuthNavProps<'Login'>) => {
  const phoneInputRef = React.createRef<Fumi>();
  const autoscroll = false;

  const [phone, setPhone] = React.useState<string | undefined>();
  const [infoText, setInfoText] = React.useState<string>(infoTextArray[0]);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  async function getUserPhoneAndroid() {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      if (phoneNumber) {
        let newPhoneNumber = phoneNumber.substring(3);
        phoneChanged(newPhoneNumber);
        onPressContinue(newPhoneNumber);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    getUserPhoneAndroid();
  }, []);

  const termsAndConditions = () => {
    Linking.openURL(URLS.WEBSITE_URL + 'terms-and-conditions');
  };
  const privacyPolicy = () => {
    Linking.openURL(URLS.WEBSITE_URL + 'privacy-policy');
  };

  const checkInputValidity = (newPhone: string) => {
    if (newPhone) {
      let checkPhone = parseInt(newPhone);
      if (checkPhone >= 6000000000 && checkPhone <= 9999999999) {
        return true;
      }
    }
    return false;
  };

  const onPressContinue = (newPhone?: string) => {
    if (phone || newPhone) {
      setButtonLoading(true);
      const usePhone = phone ? phone : newPhone;
      // POST('generate-otp', undefined, {phone: usePhone})
      //   .then(json => {
      const json = {success: true, info: true, error: null};
      if (json.error) {
        setModalVisible(true);
      }
      if (json.success) {
        const isNewCustomer = json.info ? false : true;

        navigation.navigate('Otp', {
          isNewCustomer: isNewCustomer,
          phone: usePhone as string,
        });
      }
      // })
      // .then(() => setButtonLoading(false))
      // .catch(() => setButtonLoading(false));
      setButtonLoading(false);
    }
  };

  const phoneChanged = (newPhone: string) => {
    setPhone(newPhone);
    if (checkInputValidity(newPhone)) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Image Container and image */}
      <View
        style={{
          flex: 0.6,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{aspectRatio: 1, maxHeight: 100, maxWidth: 100}}
          source={require('../../assets/logos/logo.png')}
        />
      </View>

      {/* Container 'Welcome To ChefCities' and info text */}
      <View style={{flex: 0.5, alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>
          <Text> Welcome to </Text>
          <Text style={{color: COLORS.PRIMARY}}>MyApp</Text>
        </Text>

        <Text style={{fontSize: 20, color: COLORS.SECONDARY}}>{infoText}</Text>
      </View>

      {/* container for input field */}
      <View style={{flex: 1, marginHorizontal: 15}}>
        <View style={SHADOW.MEDIUM}>
          <Fumi
            ref={phoneInputRef}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            onSubmitEditing={() => {
              if (checkInputValidity(phone as string)) {
                onPressContinue();
              } else {
                phoneInputRef.current?.blur();
              }
            }}
            label={'Phone Number'}
            iconClass={MaterialIcons}
            iconName={'phone'}
            iconColor={COLORS.PRIMARY}
            onChangeText={phoneChanged}
            value={phone}
            maxLength={10}
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
            keyboardType={'number-pad'}
          />
          <Text
            style={{
              color: COLORS.SECONDARY,
              marginVertical: 10,
              marginTop: 15,
              textAlign: 'center',
            }}>
            We will send you an OTP to verify this number
          </Text>
        </View>
        <ButtonSolid
          title={'Continue'}
          onPress={() => onPressContinue()}
          buttonLoading={buttonLoading}
          disabled={!enableButton || buttonLoading}
        />
      </View>

      {/* Container for carousal */}
      <View style={{flex: 1.5}}>
        <FlatListSlider
          data={IMAGES}
          timer={4000}
          imageKey={'image'}
          height={undefined}
          local={true}
          width={Math.round(Dimensions.get('window').width)}
          separator={0}
          loop={true}
          autoscroll={autoscroll}
          currentIndexCallback={(index: number) =>
            setInfoText(infoTextArray[index % infoTextArrayLength])
          }
          indicator
          animation
        />
      </View>

      {/* container for terms of use and privacy policy */}
      <View
        style={{
          justifyContent: 'center',
          flex: 0.2,
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <Image
          style={{height: 18, width: 18}}
          source={require('../../assets/icons/padlock.png')}
        />
        <Text>
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

      {modalVisible && (
        <ErrorModal
          modalVisible={modalVisible}
          onPressClose={() => setModalVisible(false)}
          modalContent={'OTP limit exhausted'}
          primaryButtonText={'Ok'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  link: {
    color: COLORS.SECONDARY,
  },
  checkboxView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
