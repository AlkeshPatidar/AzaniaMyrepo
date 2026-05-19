import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS_FAMILY } from '../assets/Fonts';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import color from '../common/Colors/colors';


const CustomButton = ({ title, onPress, leftIcon, style, txtColor }) => {
    return (
        <TouchableOpacity
            style={{ ...styles.buttonOuter, ...style }}
            onPress={onPress}
            activeOpacity={0.5}>
            <LinearGradient
                colors={[ '#746CFF','#461499',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonInner}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12
                    }}>
                    {leftIcon && (
                        leftIcon
                    )}

                    <Text style={{ ...styles.buttonText, ...txtColor }}>{title}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonOuter: {
        width: '100%',
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        elevation: 5,
        shadowColor: color.App_Primary_color,
        shadowOpacity: 0.35,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        alignSelf: 'center',
    },
    buttonInner: {
        minHeight: verticalScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(30),
        paddingHorizontal: moderateScale(16),
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontFamily: FONTS_FAMILY.Poppins_SemiBold
    },
});

export default CustomButton;
