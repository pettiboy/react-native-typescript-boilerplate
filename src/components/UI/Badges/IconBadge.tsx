import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../constants';
import {reduceOpacity} from '../../../utils/reduceOpacity';
import Text from '../Text/Text';

interface Props {
  name: string;
  useColor: string;
  materialIconName?: string;

  opacityReducer?: number;
  textColor?: string;
  textStyle?: TextStyle;
}

const IconBadge = ({
  useColor,
  name,
  materialIconName,
  textStyle,

  opacityReducer = 2,
  textColor = COLORS.DARK_GREY,
}: Props) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: reduceOpacity(useColor, opacityReducer),
      marginRight: 10,
      alignItems: 'center',
      flexDirection: 'row',
      padding: 1,
      borderRadius: 2,
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 11,
      color: textColor,
      ...textStyle,
    },
  });

  return (
    <View style={styles.container}>
      {materialIconName && (
        <MaterialIcons name={materialIconName} color={useColor} />
      )}

      <Text style={[styles.text, materialIconName ? {marginLeft: 5} : {}]}>
        {name}
      </Text>
    </View>
  );
};

export default IconBadge;
