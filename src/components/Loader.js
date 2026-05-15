import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import color from '../common/Colors/colors';

const Loader = ({visible = false}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            padding: 15,
            backgroundColor: '#2E3442',
            borderRadius: 12,
            elevation: 12,
          }}>
          <ActivityIndicator size={'large'} color={color.App_Primary_color} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
