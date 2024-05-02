import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  Linking,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import publicService from '../../services/publicService';
import {
  FontText,
  NavigationBar,
  AppLogo,
  AppSpacer,
  CountryPicker,
  Input,
  Button,
} from '../../components';
import {hp, normalize, wp} from '../../styles/responsiveScreen';
import PublicModel from '../../models/PublicModel';
import {connect} from 'react-redux';
import {styles} from './styles';
import utils from '../../helper/utils';
import {
  AsYouType,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js';
import CountryJSON from '../../constants/countries.json';
import colors from '../../assets/colors';
import {Check} from '../../assets/Icons';
import {routeName as otpRouteName} from '../OTP';
import {Constant} from '../../constants/AppTexts';

export const routeName = 'SignUp';
const SignUp = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isTermsSelected, setIsTermsSelected] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(() => {
    getPopulation();
  }, []);

  const getPopulation = async () => {
    utils?.startLoader();
    const response = await publicService.getPopulation();
    utils?.stopLoader();
    console.log('population......', response);
  };

  const getCountry = countryCode => {
    const countryData = CountryJSON.filter(function (item) {
      // const itemData = item.callingCode;
      const itemData = item.countryCode;
      const textData = countryCode;
      return itemData === textData;
    });
    return countryData?.[0];
  };

  const selectedValue = value => {
    setCountryCode(value);
    if (phoneNumber != '') {
      const number = formatPhoneNumber(phoneNumber, value);
      setPhoneNumber(number);
    }
  };

  const formatPhoneNumber = (value, countryCode) => {
    const countryData = getCountry(countryCode);
    if (!value) return '';
    value = value.toString();
    if (value.includes('(') && !value.includes(')')) {
      return value.replace('(', '');
    }
    return new AsYouType(countryData?.countryCode).input(value);
  };

  const validatePhone = value => {
    const countryData = getCountry(countryCode);
    const validNumber = isValidPhoneNumber(value, countryData?.countryCode);
    const validLength = validatePhoneNumberLength(
      value,
      countryData?.countryCode,
    );
    return validLength == undefined;
  };

  const onChangePhoneNumber = value => {
    const number = formatPhoneNumber(value, countryCode);
    setPhoneNumber(number);
  };

  const handleTermsUse = async () => {
    await Linking.openURL('https://www.google.com');
  };

  const onPressTermsCheck = () => {
    setIsTermsSelected(!isTermsSelected);
  };

  const onPressNext = () => {
    setCheckError(true);
    if (
      phoneNumber.length != 0 &&
      validatePhone(phoneNumber) &&
      isTermsSelected
    ) {
      const countryData = getCountry(countryCode);
      utils?.startLoader();
      setTimeout(() => {
        utils.stopLoader();
        navigation.navigate(otpRouteName, {
          phoneNumber: `${countryData?.callingCode}${phoneNumber}`,
        });
      }, 1000);
    }
  };

  const onSubmitPhoneNumber = value => {
    Keyboard.dismiss();
  };

  const isValidPhone =
    checkError && (phoneNumber.length === 0 || !validatePhone(phoneNumber));

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.wrapper}>
        <NavigationBar hasCenter borderBottomWidth={0} />
        <AppLogo />
        <AppSpacer />
        <FontText
          color="textPrimary"
          size={normalize(24)}
          name="worksans-semibold">
          {Constant?.SignUpTitle}
        </FontText>
        <FontText
          color="textPrimary"
          size={normalize(16)}
          pTop={hp(1.5)}
          pBottom={hp(1.5)}>
          {Constant?.SignUpDesc1}
        </FontText>
        <FontText
          color="textPrimary"
          size={normalize(16)}
          textAlign={'center'}
          lineHeightFactor={1.2}>
          {Constant?.SignUpDesc2}
        </FontText>
        <View style={styles.phoneContainer}>
          <Input
            color="black"
            value={phoneNumber}
            fontSize={normalize(16)}
            placeholder={Constant?.PhoneNumber}
            placeholderTextColor="placeholder"
            style={styles.inputConatiner}
            inputStyle={[styles.phoneInput]}
            onChangeText={onChangePhoneNumber}
            onSubmit={onSubmitPhoneNumber}
            maxLength={15}
            keyboardType="numeric"
            returnKeyType="done">
            <CountryPicker
              disable={false}
              animationType={'slide'}
              language="en"
              containerStyle={styles.codePickerStyle}
              selectedCountryTextStyle={styles.selectedCountryTextStyle}
              countryNameTextStyle={styles.countryNameTextStyle}
              searchBarPlaceHolder={Constant?.Search}
              hideCountryFlag={true}
              hideCountryShortName={true}
              searchBarStyle={styles.searchBarStyle}
              countryCode={countryCode}
              selectedValue={selectedValue}
            />
          </Input>

          <CountryPicker
            disable={false}
            animationType={'slide'}
            language="en"
            containerStyle={styles.pickerStyle}
            selectedCountryTextStyle={{
              ...styles.selectedCountryTextStyle,
              paddingLeft: wp(2),
            }}
            countryNameTextStyle={styles.countryNameTextStyle}
            searchBarPlaceHolder={Constant?.Search}
            hideCountryCode={true}
            searchBarStyle={styles.searchBarStyle}
            countryCode={countryCode}
            selectedValue={selectedValue}
          />
        </View>
        <FontText
          color={'darkRed'}
          size={normalize(14)}
          pTop={hp(0.5)}
          style={styles.txtError}>
          {checkError && isValidPhone
            ? phoneNumber.length === 0
              ? Constant?.EnterNumber
              : Constant?.ValidNumber
            : ''}
        </FontText>
        <TouchableWithoutFeedback onPress={onPressTermsCheck}>
          <View style={styles.termsContainer}>
            <View
              style={{
                ...styles.checkCircle,
                backgroundColor: isTermsSelected
                  ? colors.textSecondary
                  : colors.white,
              }}>
              <Image source={Check} style={styles.iconCheck} />
            </View>
            <FontText size={normalize(14)} color="textSecondary">
              {Constant?.IAgree}
            </FontText>
            <Button flex={false} height={null} onPress={handleTermsUse}>
              <FontText
                size={normalize(14)}
                color="textSecondary"
                name="worksans-semibold"
                textDecoration="underline">
                {Constant?.TermsUse}
              </FontText>
            </Button>
          </View>
        </TouchableWithoutFeedback>

        <FontText
          color={'darkRed'}
          size={normalize(14)}
          pTop={hp(0.5)}
          style={{...styles.txtError, marginTop: hp(2)}}
          textAlign={'center'}>
          {checkError && !isTermsSelected ? Constant?.SelectTerms : ''}
        </FontText>

        <Button
          flex={null}
          height={hp(6)}
          width="100%"
          borderRadius={8}
          bgColor="textSecondary"
          onPress={onPressNext}
          style={styles.btnNext}>
          <FontText name="worksans-semibold" size={normalize(16)} color="white">
            {Constant?.Next}
          </FontText>
        </Button>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    population: PublicModel.getInstance('population', state).props.population,
  };
};

export default connect(mapStateToProps)(SignUp);
