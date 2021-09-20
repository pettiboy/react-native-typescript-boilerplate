import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { TouchableOpacity, StyleSheet, View } from 'react-native'

interface CheckboxProps  {
  style?: object,
  children?: (string | Element)[] | string | string[] | Element, 
  size: number,
  color: string,
  selected: boolean,
  onPress(): void,
}

const CheckBox = (props: CheckboxProps)  => {
    
  return (
    <TouchableOpacity 
      style={[styles.checkBox, props.style]} 
      onPress={props.onPress}
    >

      <Icon
        size={props.size}
        color={props.color}
        name={ props.selected ? 'check-box' : 'check-box-outline-blank'}
      />

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default CheckBox