import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';


export type AuthStackParamList = {
  Login: undefined,
  Otp: { isNewCustomer: boolean, phone: string }
}
export type AuthNavProps<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>
  route: RouteProp<AuthStackParamList, T>
}

export type HomeStackParamList = {
  AllOrders: undefined,
  Order: {
    order_id: number
  },
  WebViewScreen: {
    url: string,
    orderId: number
  }
}
export type HomeNavProps<T extends keyof HomeStackParamList> = {
  navigation: StackNavigationProp<HomeStackParamList, T>
  route: RouteProp<HomeStackParamList, T>
}