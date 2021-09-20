import { ImageSourcePropType } from "react-native";
import { IP } from "./env";

export const URLS = {
  BASE_URL: `http://${IP}:8000/`,
  IMAGE_BASE_URL: `http://${IP}:8000/media/`,
  PRODUCT_IMAGE_BASE_URL: `http://${IP}:8000`,
  WEBSITE_URL: 'https://chefcities.com/',
};

export const COLORS = {
  // PRIMARY: '#cd7e0a',
  PRIMARY: 'rgb(205,126,10)',
  PRIMARY_DISABLED: '#e6be84',
  PRIMARY_2: 'rgba(205,126,10,0.3)',

  DARK_GREY: 'rgb(72,72,72)',
  GREY: 'rgb(144,144,144)',
  LIGHT_GREY: '#dcdcdc',

  SECONDARY: '#1676ad',
  SECONDARY_DISABLED: '#8abad6',

  GREEN: 'rgb(0,163,0)',
  GREEN_5: 'rgba(0,163,0,0.5)',

  RED: 'rgb(255,105,97)',
  RED_5: 'rgba(255,105,97,0.5)',

  BLUE: 'rgb(100, 149, 237)',

  YELLOW: 'rgb(253,253,125)',
  YELLOW_5: 'rgba(253,253,125,0.5)',

  VIOLET: 'rgb(149,125,173)',

  WHITE: '#fff',
}

export const SHADOW = {
  MEDIUM: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,        
    elevation: 6,
  },
}


interface IconsType<T> {
  [Key: string]: T;
}
export const ICONS: IconsType<ImageSourcePropType> = {
  VEG: require('../assets/icons/veg-64.png'),
  NON_VEG: require('../assets/icons/non-veg-64.png'),
}