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

import {POST} from '../../api/fetch';
import ButtonSolid from '../../components/UI/Buttons/ButtonSolid';
import FlatListSlider from '../../components/UI/Slider/FlatListSlider';
import Text from '../../components/UI/Text/Text';
import {COLORS, SHADOW, URLS} from '../../constants';
import {AuthNavProps} from '../../navigation/types';
import {Fumi} from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const infoTextArray = [
  'Order Homemade Food Online',
  'Easy To Use App',
  'Enjoy Super Fast Delivery',
  'Get Amazing Offers',
  'Easy Online Payments',
];
const infoTextArrayLength = infoTextArray.length;
const IMAGES = [
  {image: require('../../assets/images/healthy-homemade-food.png')},
  {image: require('../../assets/images/easy-to-use.png')},
  {image: require('../../assets/images/fast-delivery.png')},
  {image: require('../../assets/images/offers.png')},
  {image: require('../../assets/images/pay-online.png')},
];

const Login = ({navigation}: AuthNavProps<'Login'>, {}) => {
  const phoneInputRef = React.createRef<Fumi>();

  const [phone, setPhone] = React.useState<string | undefined>();
  const [infoText, setInfoText] = React.useState<string>(infoTextArray[0]);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const termsAndConditions = () => {
    Linking.openURL(URLS.WEBSITE_URL + 'terms-and-conditions');
  };
  const privacyPolicy = () => {
    Linking.openURL(URLS.WEBSITE_URL + 'privacy-policy');
  };

  const generateOTP = async () => {
    console.log('requesting otp for', phone);
    const json = await POST('generate-otp', undefined, {phone: phone});
    return json.info ? false : true; // if new customer returns false
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
  const onPressContinue = async () => {
    if (phone && enableButton) {
      const response = await generateOTP();
      navigation.navigate('Otp', {
        isNewCustomer: response,
        phone: phone,
      });
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
      <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{aspectRatio: 1, maxHeight: 93, maxWidth: 93}}
          source={require('../../assets/logos/gold-fill.png')}
        />
      </View>

      {/* Container 'Welcome To ChefCities' and info text */}
      <View style={{flex: 0.5, alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>
          <Text style={{}}>ChefCities </Text>
          <Text style={{color: COLORS.PRIMARY}}>Partner</Text>
          {/* <Text> Welcome to </Text> */}
        </Text>

        <Text style={{fontSize: 20, color: COLORS.SECONDARY}}>{infoText}</Text>
      </View>

      {/* container for input field */}
      <View style={{flex: 1, marginHorizontal: 15}}>
        <View style={styles.shadow}>
          <Fumi
            ref={phoneInputRef}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            onSubmitEditing={() => {
              onPressContinue();
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
          style={{borderRadius: 5}}
          disabled={!enableButton}
          onPress={onPressContinue}
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
          autoscroll={false}
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
        {/* <Image
          style={{height: 18, width: 18}}
          source={require('../../assets/icons/padlock.png')}
        /> */}
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default Login;
