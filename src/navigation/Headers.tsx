import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from '../components/UI/Text/Text';
import {AuthContext, AuthContextType} from '../context/Auth';

export const CustomTextHeader = (props: any) => {
  let title = props.title;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text weight={'SemiBold'} style={{fontSize: 19}}>
        {title}
      </Text>
    </View>
  );
};

export const AllOrdersRightHeader = (props: any) => {
  const {signOut} = React.useContext(AuthContext) as AuthContextType;
  const [visible, setVisible] = React.useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const logout = () => {
    hideMenu();
    signOut();
  };

  return (
    <View
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      {/* <Menu
        visible={visible}
        anchor={,
          <TouchableOpacity onPress={showMenu}>
            <MaterialIcons
              name={'more-vert'}
              size={20}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}>
        <MenuDivider />
        <MenuItem onPress={logout}>Logout</MenuItem>
      </Menu> */}
    </View>
  );
};
