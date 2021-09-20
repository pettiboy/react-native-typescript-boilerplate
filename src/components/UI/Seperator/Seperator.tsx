import React from 'react'
import { ViewProps, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../../constants'

interface SeperatorProps {
  useColor?: string,
  margin?: number,
  width?: number,
  style?: ViewStyle,
  marginVertical?: number,
  disableDefaultMargin?: boolean
}

const Seperator = ({

  useColor = COLORS.PRIMARY,
  margin = 5,
  width = 1,
  style,
  marginVertical,
  disableDefaultMargin=true

}: SeperatorProps) => {

  return (
    <View
      style={[{
        borderBottomColor: useColor,
        borderBottomWidth: width,
        marginVertical: marginVertical
      }, style, disableDefaultMargin ? {} : {margin: margin}]}
    />
  )

}

const styles = StyleSheet.create({

  container: {

  }
  
})

export default Seperator
