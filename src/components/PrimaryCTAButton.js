import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import color from '../common/Colors/colors'
import { FONTS_FAMILY } from '../assets/Fonts'

const PrimaryCTAButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  style,
  buttonStyle,
  textStyle,
  gradientColors,
  activeOpacity = 0.88,
}) => {
  const resolvedDisabled = disabled || loading
  const colors = resolvedDisabled
    ? ['#B8B8B8', '#9E9E9E']
    : (gradientColors && gradientColors.length ? gradientColors : [color.Ctaone, color.ctatwo, color.ctathree])

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[styles.outer, style, resolvedDisabled && styles.outerDisabled]}
      onPress={onPress}
      disabled={resolvedDisabled}
    >
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.inner, buttonStyle]}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <View style={styles.contentRow}>
            {leftIcon}
            <Text style={[styles.text, textStyle]}>{title}</Text>
            {rightIcon}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: color.App_Primary_color,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    height:40
  },
  outerDisabled: {
    elevation: 0,
    shadowOpacity: 0,
    // height:40

  },
  inner: {
    height: 40,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    letterSpacing: 0.3,
  },
})

export default PrimaryCTAButton
