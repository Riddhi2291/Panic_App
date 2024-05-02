import React, {
  createRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, TextInput, StyleSheet, findNodeHandle} from 'react-native';
import colors from '../../assets/colors';
import {hp, normalize, wp} from '../../styles/responsiveScreen';

const Input = forwardRef(
  (
    {
      value,
      editable,
      height,
      fontSize,
      color,
      placeholder,
      placeholderTextColor,
      blurOnSubmit,
      returnKeyType,
      multiline,
      multilineHeight,
      keyboardType,
      autoCapitalize,
      maxLength,
      secureTextEntry,
      inputStyle,
      children,
      style,
      onFocus,
      onBlur,
      autoFocus,
      textAlign,
      caretHidden,
      contextMenuHidden,
      selectTextOnFocus,
      pointerEvents,
      onSubmit,
      clearOnSubmit,
      willCheckPosition,
      checkPosition,
      onChangeText,
      onEndEditing,
      onKeyPress,
      autoCorrect,
    },
    ref,
  ) => {
    const [inputValue, setValue] = useState(value);
    const [inputEditable, setEditable] = useState(editable);
    let inputRef = createRef();

    const onChangeTextHandler = text => {
      setValue(text);
      if (typeof onChangeText === 'function') {
        onChangeText(text);
      }
    };

    const onSubmitEditingHandler = () => {
      if (typeof onSubmit === 'function') {
        onSubmit(inputValue);
      }
      if (clearOnSubmit) {
        setValue('');
      }
    };

    const onFocusHandler = () => {
      if (typeof onFocus === 'function') {
        onFocus();
      }
      if (willCheckPosition && typeof checkPosition === 'function') {
        checkPosition(findNodeHandle(inputRef));
      }
    };

    const _inputStyle = {
      height: multiline ? multilineHeight : height,
      fontSize,
      color: colors[color],
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.focus(),
      blur: () => inputRef.blur(),
      disable: () => setEditable(false),
      enable: () => setEditable(true),
    }));

    return (
      <View style={[styles.wrapper, style]}>
        {children}
        <TextInput
          ref={el => {
            inputRef = el;
          }}
          textContentType="none"
          pointerEvents={pointerEvents}
          editable={inputEditable}
          value={value}
          textAlign={textAlign}
          autoComplete="off"
          autoCorrect={!!(autoCorrect && autoCorrect === true)}
          allowFontScaling={false}
          placeholder={placeholder}
          placeholderTextColor={
            colors[placeholderTextColor]
              ? `${colors[placeholderTextColor]}4d`
              : ''
          }
          onChangeText={onChangeTextHandler}
          onSubmitEditing={onSubmitEditingHandler}
          blurOnSubmit={multiline ? false : blurOnSubmit}
          returnKeyType={returnKeyType}
          multiline={multiline}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onFocus={onFocusHandler}
          onBlur={onBlur}
          onEndEditing={onEndEditing}
          autoFocus={autoFocus}
          caretHidden={caretHidden}
          contextMenuHidden={contextMenuHidden}
          selectTextOnFocus={selectTextOnFocus}
          onKeyPress={onKeyPress}
          style={[
            multiline ? styles.inputMultiline : null,
            styles.input,
            _inputStyle,
            inputStyle,
          ]}
        />
      </View>
    );
  },
);

Input.defaultProps = {
  height: hp(5.5),
  fontSize: normalize(16),
  color: 'default',
  placeholder: 'Type something...',
  placeholderTextColor: colors.placeholder,
  defaultValue: '',
  clearOnSubmit: false,
  blurOnSubmit: false,
  returnKeyType: 'default',
  multiline: false,
  multilineHeight: hp(10),
  autoCapitalize: null,
  editable: true,
  keyboardType: 'default',
  maxLength: null,
  secureTextEntry: false,
  onFocus: null,
  onBlur: null,
  autoFocus: false,
  textAlign: null,
  onChangeText: null,
  caretHidden: false,
  contextMenuHidden: false,
  selectTextOnFocus: false,
  willCheckPosition: true,
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: wp(2),
    paddingRight: wp(2),
    backgroundColor: colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  wrapper: {
    justifyContent: 'center',
  },
});

export default Input;
