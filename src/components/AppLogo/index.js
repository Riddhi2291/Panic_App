import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppIcon} from '../../assets/Icons';
import {wp} from '../../styles/responsiveScreen';

// Creating a custom Image component called AppLogo
const AppLogo = ({style, height, width}) => {
  const logoStyle = {height: height, width: width};

  return (
    <View style={[styles.container, style]}>
      <Image style={[styles?.logo, logoStyle]} source={AppIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  logo: {
    resizeMode: 'contain',
    borderRadius: 8,
  },
});

// Default props for AppLogo component
AppLogo.defaultProps = {
  height: wp(12),
  width: wp(12),
};

export default AppLogo;
