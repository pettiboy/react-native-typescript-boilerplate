import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';

import ButtonOutline from '../Buttons/ButtonOutline';
import Seperator from '../Seperator/Seperator';
import Text from '../Text/Text';
import {COLORS} from '../../../constants';

interface ErrorModalProps {
  modalVisible: boolean;
  onPressClose(): void;

  modalContent: string;
  primaryButtonText: string;
}

const ErrorModal = ({
  modalVisible,
  onPressClose,

  modalContent,
  primaryButtonText,
}: ErrorModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPressClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Heading */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/modal/warning.png')}
              style={{height: 64, width: 64}}
            />
          </View>

          <Seperator useColor={'#dcdcdc'} style={{marginVertical: 19}} />

          <Text style={{textAlign: 'center', fontSize: 18}}>
            {modalContent}
          </Text>

          <Seperator useColor={'#dcdcdc'} style={{marginVertical: 19}} />

          <View
            style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <ButtonOutline
              title={primaryButtonText}
              useColor={COLORS.RED}
              onPress={onPressClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 15,
    width: '100%',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headingText: {
    // marginBottom: 15,
    fontSize: 25,
    textAlign: 'center',
  },
});

export default ErrorModal;
