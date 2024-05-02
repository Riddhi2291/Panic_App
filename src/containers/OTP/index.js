import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {
  FontText,
  NavigationBar,
  AppLogo,
  AppSpacer,
  Button,
} from '../../components';
import {hp, normalize} from '../../styles/responsiveScreen';
import PublicModel from '../../models/PublicModel';
import {connect} from 'react-redux';
import {styles} from './styles';
import utils from '../../helper/utils';
import HighlightText from '../../components/HighLightText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Check} from '../../assets/Icons';
import colors from '../../assets/colors';
import otpService from '../../services/otpService';

export const routeName = 'OTP';
const OTP = ({navigation, route}) => {
  const phoneNumber = route?.params?.phoneNumber;
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [OTP, setOTP] = useState('');

  const onPressNext = async () => {
    utils?.startLoader();
    const response = await otpService.checkValidOTP({otp: OTP});
    if (response?.error) {
      setErrorMessage(response?.message);
    } else {
      setSuccessMessage(response?.message);
    }
    utils?.stopLoader();
  };

  const onChangeOTP = value => {
    setOTP(value);
    if (OTP?.length <= 6) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const onGoBack = () => {
    navigation?.goBack();
  };

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled">
      <View style={styles.wrapper}>
        <NavigationBar hasCenter borderBottomWidth={0} />
        <AppLogo />
        <AppSpacer />
        <FontText
          color="textPrimary"
          size={normalize(24)}
          name="worksans-semibold"
          pBottom={hp(1.5)}>
          {'Enter OTP'}
        </FontText>

        <HighlightText
          highlightStyle={styles.highlightedText}
          searchWords={[`${phoneNumber}`]}
          textToHighlight={`A one-time pin has been sent to\n+${phoneNumber}. Please enter it below`}
          style={styles.headerText}
        />

        <OTPInputView
          style={styles.otpContainer}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={onChangeOTP}
          autoFocusOnLoad
          codeInputFieldStyle={{
            ...styles.underlineStyleBase,
            borderColor:
              successMessage != '' || errorMessage != ''
                ? successMessage != ''
                  ? colors.green
                  : colors.red
                : colors.textSecondary,
            backgroundColor:
              successMessage != '' || errorMessage != ''
                ? successMessage != ''
                  ? colors.lightGreen
                  : colors.lightRed
                : colors.white,
          }}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />

        {successMessage != '' && (
          <View style={styles.confirmContainer}>
            <View style={styles.checkCircle}>
              <Image source={Check} style={styles.iconCheck} />
            </View>
            <FontText size={normalize(18)} name="worksans-medium" color="green">
              {'Confirmed'}
            </FontText>
          </View>
        )}
        {errorMessage != '' && (
          <FontText
            size={normalize(14)}
            name="worksans-regular"
            color="darkRed">
            {errorMessage}
          </FontText>
        )}

        <Button flex={false} height={null} style={styles.btnResend}>
          <FontText
            size={normalize(16)}
            color="textSecondary"
            name="worksans-semibold">
            {'Resend OTP'}
          </FontText>
        </Button>

        <Button
          disabled={OTP?.length != 6}
          flex={null}
          height={hp(6)}
          width="100%"
          borderRadius={8}
          bgColor={OTP?.length != 6 ? 'disable' : 'textSecondary'}
          onPress={onPressNext}
          style={styles.btnNext}>
          <FontText
            name="worksans-semibold"
            size={normalize(16)}
            color={OTP?.length != 6 ? 'lightGray' : 'white'}>
            {'Next'}
          </FontText>
        </Button>

        <Button
          flex={false}
          height={null}
          style={styles.btnBack}
          onPress={onGoBack}>
          <FontText
            size={normalize(16)}
            color="textSecondary"
            name="worksans-semibold">
            {'Back'}
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

export default connect(mapStateToProps)(OTP);
