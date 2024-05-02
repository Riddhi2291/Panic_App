import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import colors from '../../assets/colors';
import {hp, isIphoneXorAbove} from '../../styles/responsiveScreen';

export const navbarXSpace =
  Platform.OS === 'ios' ? (isIphoneXorAbove ? hp(2.5) : 0) : 0;
export const navbarHeight = Platform.OS === 'ios' ? hp(6.5) : hp(4.5);

const NavigationBar = ({
  height,
  style,
  isFixed,
  bgColor,
  left,
  hasLeft,
  right,
  hasRight,
  center,
  hasCenter,
  leftStyle,
  centerStyle,
  rightStyle,
  sidesWidth,
  borderBottomWidth,
}) => {
  const _wrapperStyle = {
    height: height + navbarXSpace,
    borderBottomWidth,
  };
  const _sideStyle = {
    width: sidesWidth,
  };
  bgColor =
    typeof bgColor === 'string' ? {backgroundColor: colors[bgColor]} : bgColor;

  return (
    <View
      style={[
        styles.wrapper,
        isFixed ? styles.wrapperFixed : null,
        bgColor,
        _wrapperStyle,
        style,
      ]}>
      {hasLeft ? (
        <View style={[styles.left, _sideStyle, leftStyle]}>{left}</View>
      ) : null}
      {hasCenter ? (
        <View style={[styles.center, centerStyle]}>{center}</View>
      ) : null}
      {hasRight ? (
        <View style={[styles.right, _sideStyle, rightStyle]}>{right}</View>
      ) : null}
    </View>
  );
};

NavigationBar.defaultProps = {
  height: navbarHeight,
  isFixed: false,
  bgColor: 'transparent',
  hasLeft: false,
  hasCenter: false,
  hasRight: false,
  left: null,
  center: null,
  right: null,
  sidesWidth: 88,
  borderBottomWidth: 1,
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NavigationBar.height,
    paddingTop: Platform.OS === 'ios' ? 20 + navbarXSpace : 0,
  },
  wrapperFixed: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
  },
  center: {
    width: 0,
    flexGrow: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 8,
  },
});

export default NavigationBar;
