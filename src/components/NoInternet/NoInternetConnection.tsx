import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Text from '../UI/Text/Text';
import {COLORS} from '../../constants';

interface Props {}

const NoInternetConnection = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 4, width: '100%'}}>
        <LottieView
          source={require('../../assets/animations/no-internet.json')}
          autoPlay
          loop={true}
        />
      </View>

      <View style={{flex: 1, marginHorizontal: 20}}>
        <Text
          weight={'SemiBold'}
          style={{
            textAlign: 'center',
            flex: 1,
            fontSize: 35,
            color: COLORS.RED,
          }}>
          Whoops!
        </Text>
        <Text style={{textAlign: 'center', flex: 1, fontSize: 25}}>
          No Internet Connection.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default NoInternetConnection;
