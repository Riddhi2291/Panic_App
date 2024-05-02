import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import {hp, wp} from '../../styles/responsiveScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },
  pickerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(3),
    paddingHorizontal: wp(2.5),
    height: hp(5.5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  selectedCountryTextStyle: {
    paddingRight: wp(2),
    color: colors.textSecondary,
  },
  codePickerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
  },
  countryNameTextStyle: {
    paddingLeft: wp(3),
    color: colors.textSecondary,
    textAlign: 'right',
  },
  searchBarStyle: {
    flex: 1,
    marginLeft: wp(3),
  },
  phoneInput: {
    flex: 1,
  },
  inputConatiner: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: wp(2.5),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(6),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  txtError: {
    width: '100%',
    height: hp(3.5),
  },
  checkCircle: {
    height: wp(5),
    width: wp(5),
    borderRadius: wp(2.5),
    marginRight: wp(2.5),
    borderWidth: 1,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCheck: {
    height: wp(2.3),
    width: wp(2.3),
    resizeMode: 'contain',
  },
  btnNext: {
    marginTop: hp(4.5),
  },
});
