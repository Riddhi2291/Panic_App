import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import {hp, normalize, wp} from '../../styles/responsiveScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },
  btnNext: {
    marginTop: hp(2.5),
  },
  headerText: {
    fontSize: normalize(16),
    fontFamily: 'worksans-regular',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  highlightedText: {
    fontFamily: 'worksans-semibold',
  },
  otpContainer: {
    width: '100%',
    height: hp(15),
    marginTop: hp(2),
  },
  underlineStyleBase: {
    width: wp(12),
    height: hp(8),
    borderBottomWidth: 1,
    borderRadius: 8,
    color: colors.black,
    fontFamily: 'worksans-semibold',
    fontSize: normalize(20),
  },
  underlineStyleHighLighted: {
    borderColor: colors.green,
  },
  confirmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    height: wp(5),
    width: wp(5),
    borderRadius: wp(2.5),
    marginRight: wp(2.5),
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCheck: {
    height: wp(2.3),
    width: wp(2.3),
    resizeMode: 'contain',
  },
  btnResend: {
    marginTop: hp(9.5),
  },
  btnBack: {
    position: 'absolute',
    bottom: hp(4),
    paddingVertical: hp(1),
  },
});
