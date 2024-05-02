import {StyleSheet} from 'react-native';
import colors from '../assets/colors';

export default StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  flex: {
    flex: 1,
  },
  flexibleW: {
    width: 0,
    flexGrow: 2,
  },
  flexibleH: {
    height: 0,
    flexGrow: 2,
  },
  row: {
    flexDirection: 'row',
  },
  rowWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  rowJC: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowAC: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowJB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowC: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowAE: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rowJE: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  colJC: {
    justifyContent: 'center',
  },
  colAC: {
    alignItems: 'center',
  },
  colJB: {
    justifyContent: 'space-between',
  },
  colC: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colAE: {
    alignItems: 'flex-end',
  },
  colJE: {
    justifyContent: 'flex-end',
  },
  overlay: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000090',
  },
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
  },
});
