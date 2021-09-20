import React from 'react';

import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

interface TextProps extends RNTextProps {
  style?: TextStyle | TextStyle[]
  children: React.ReactNode 
  weight?: 
  'Black' | 
  'BlackItalic' | 
  'Bold' |
  'BoldItalic' | 
  'ExtraBold' | 
  'ExtraBoldItalic' | 
  'ExtraLight' | 
  'ExtraLightItalic' | 
  'Italic' | 
  'Light' | 
  'LightItalic' | 
  'Regular' | 
  'SemiBold' |
  'SemiBoldItalic'
}

export default function Text(props: TextProps) {

  let fontFromProps = 'Nunito-Regular'
  if (props.weight) {
    fontFromProps = `Nunito-${props.weight}`
  }

  return (
    <RNText {...props}
      style={[
        { fontFamily: fontFromProps },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  )
}
