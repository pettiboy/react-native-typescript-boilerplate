import React from 'react';
import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonSolid from '../../components/UI/Buttons/ButtonSolid';
import {AuthContext, AuthContextType} from '../../context/Auth';

type NavProps<T> = any;

interface HomeProps {}

const Home = ({}: NavProps<''>, {}: HomeProps) => {
  const {signOut} = useContext(AuthContext) as AuthContextType;

  return (
    <View style={styles.container}>
      <ButtonSolid title={'Logout'} onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
