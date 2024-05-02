import React from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import colors from '../../assets/colors';
import {hp} from '../../styles/responsiveScreen';

// Flag for threshold has reached to prevent firing "onPress"
let hasMoveBeyondThreshold = false;
const threshold = 20;
let _pageX;
let _pageY;

// function generator to attach global calls
function onButtonPress(props) {
  return evt => {
    const {onPress, dismissKeyboardOnPress} = props;
    dismissKeyboardOnPress && Keyboard.dismiss();
    if (!hasMoveBeyondThreshold && onPress) {
      onPress(evt);
    }
  };
}

function onTouchStartHandle(evt) {
  const {pageX, pageY} = evt.nativeEvent;
  _pageY = pageY;
  _pageX = pageX;
  hasMoveBeyondThreshold = false;
}

function onTouchMoveHandle(evt) {
  const {pageX, pageY} = evt.nativeEvent;
  if (
    Math.abs(pageY - _pageY) >= threshold ||
    Math.abs(pageX - _pageX) >= threshold
  ) {
    hasMoveBeyondThreshold = true;
  }
}

function onTouchEndHandle() {
  hasMoveBeyondThreshold = false;
}

const Button = props => {
  const {
    children,
    position,
    flex,
    style,
    height,
    width,
    minWidth,
    buttonStyle,
    sideOffset,
    type,
    defaultOpacity,
    activeOpacity,
    underlayColor,
    bgColor,
    disabled,
    borderRadius,
    fluid,
    checkThreshold,
    innerRowStyle,
    pointerEvents,
  } = props;
  // style of the wrapper row that wraps the Touch Views
  const rowStyle = {
    height,
    width,
    minWidth,
    paddingLeft: sideOffset,
    paddingRight: sideOffset,
    borderRadius,
  };
  let button;
  switch (type) {
    case 'opacity':
      button = (
        <TouchableOpacity
          onPressIn={onTouchEndHandle}
          activeOpacity={activeOpacity}
          onPress={onButtonPress(props)}
          disabled={disabled}
          pointerEvents={pointerEvents}
          style={[
            flex ? styles.buttonFlex : null,
            styles.button,
            {width, minWidth, borderRadius},
            buttonStyle,
            bgColor ? {backgroundColor: colors[bgColor]} : null,
            styles[
              (position === 'left' && 'rowLeft') ||
                (position === 'center' ? 'rowCenter' : 'rowRight')
            ],
          ]}>
          {children}
        </TouchableOpacity>
      );
      break;

    case 'highlight':
      button = (
        <View
          pointerEvents={pointerEvents}
          style={[
            flex ? styles.buttonFlex : null,
            styles.button,
            {width, minWidth, borderRadius},
            buttonStyle,
            styles[
              (position === 'left' && 'rowLeft') ||
                (position === 'center' ? 'rowCenter' : 'rowRight')
            ],
            {backgroundColor: colors[underlayColor]},
          ]}>
          <TouchableOpacity
            onPressIn={onTouchEndHandle}
            onPress={onButtonPress(props)}
            disabled={disabled}
            activeOpacity={activeOpacity}
            style={[
              {opacity: defaultOpacity},
              StyleSheet.absoluteFill,
              bgColor ? {backgroundColor: colors[bgColor]} : null,
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              flex ? styles.buttonHighlightInner : styles.buttonRowInner,
              minWidth ? {minWidth} : null,
              innerRowStyle,
            ]}>
            {children}
          </View>
        </View>
      );
      break;

    default:
      break;
  }

  if (fluid) {
    rowStyle.flex = null;
  }

  return (
    <View
      pointerEvents={pointerEvents}
      style={[
        flex ? styles.rowFlex : styles.row,
        styles[
          (position === 'left' && 'rowLeft') ||
            (position === 'center' ? 'rowCenter' : 'rowRight')
        ],
        rowStyle,
        style,
      ]}
      onTouchStart={checkThreshold ? onTouchStartHandle : null}
      onTouchMove={checkThreshold ? onTouchMoveHandle : null}
      onTouchEnd={checkThreshold ? onTouchEndHandle : null}>
      {button}
    </View>
  );
};

Button.defaultProps = {
  position: 'center',
  flex: true,
  height: hp(5.4),
  width: null,
  minWidth: 44,
  sideOffset: 0,
  type: 'opacity',
  defaultOpacity: 1,
  activeOpacity: 0.5,
  borderRadius: 0,
  underlayColor: colors.white,
  bgColor: null,
  disabled: false,
  fluid: false,
  checkThreshold: false,
  dismissKeyboardOnPress: true,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  rowFlex: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  button: {
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonFlex: {
    flex: 1,
  },
  buttonHighlightInner: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default Button;
