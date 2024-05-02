import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp} from '../../styles/responsiveScreen';

// Creating a custom Space component called AppSpacer
const AppSpacer = ({height}) => {
  return <View style={{height: height}} />;
};

const styles = StyleSheet.create({
  container: {},
});

// Default props for AppSpacer component
AppSpacer.defaultProps = {
  height: hp(5),
};

export default AppSpacer;
