import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default (ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height
}) => {
  return (
    <View
      style={styles.container}>
      <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: item[imageKey]}}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    // aspectRatio: 2,
    resizeMode: 'contain',
  },
});