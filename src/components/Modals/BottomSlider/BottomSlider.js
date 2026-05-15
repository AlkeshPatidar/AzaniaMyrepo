import React from 'react';
import {
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import getStyles from './bottomSlider.styles';
import getStyles from './BottomSliderStyles';

const {height, width} = Dimensions.get('window');

const BottomSlider = ({
  isOpen,
  children,
  onClose,
  outerPress,
  isPotrait,
  sliderHeight = 0.5,
  sliderStyles = {},
  sliderBackgroundStyles = {},
}) => {
  const {bottomSheet, innerView} = getStyles(isPotrait);

  return (
      <Modal
        visible={isOpen}
        transparent={true}
        onRequestClose={onClose}
        animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={outerPress}>
            <View style={bottomSheet}>
              <TouchableWithoutFeedback onPress={null}>
                <View
                  style={[
                    innerView,
                    isPotrait && {height: height * sliderHeight},
                    sliderStyles,
                  ]}>
                    {/* <View style={{backgroundColor:'rgba(232, 230, 234, 1)', height:10, width:50, borderRadius:20}}/> */}
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
  );
};

export default BottomSlider;
