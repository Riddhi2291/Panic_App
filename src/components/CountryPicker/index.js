import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryJSON from '../../constants/countries.json';
import {ArrowDown, BackBlack, Search} from '../../assets/Icons';
import {hp, wp} from '../../styles/responsiveScreen';
import colors from '../../assets/colors';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 56;
const PADDING_TOP = Platform.OS === 'ios' ? 20 : 0;

export default class CountryPicker extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      selectedCountryFlag: '',
      hidePickerTitle: true,
      hideSearchBar: false,
      arrayData: CountryJSON,
      modalVisible: false,
      selectedFlag: false,
    };
  }

  _searchFilterFunction(searchText) {
    if (/^-{0,1}\d+$/.test(searchText)) {
      var newData = CountryJSON.filter(function (item) {
        const itemData = item.callingCode;
        const textData = searchText;
        return itemData.startsWith(textData);
      });
    } else {
      var newData = CountryJSON.filter(function (item) {
        const itemData = item?.name?.en?.toUpperCase();
        const textData = searchText?.toUpperCase();
        return itemData?.startsWith(textData);
      });
    }
    this.setState({
      arrayData: [...newData],
    });
  }

  _listItemClickListener(item) {
    this.setState({
      modalVisible: false,
      selectedFlag: true,
      selectedCountryCode: item?.callingCode,
      selectedCountryFlag: item?.flag,
      selectedCountryName: item?.name?.en,
      selectedCountryShortName: item?.code,
      arrayData: CountryJSON,
    });
    this.props.selectedValue(item.countryCode);
  }

  static _selectDefaultCountry(
    defaultText,
    dropDownImage,
    hideCountryFlag,
    hideCountryCode,
    hideCountryShortName,
    selectedCountryTextStyle,
  ) {
    const newData = CountryJSON.filter(function (item) {
      // const itemData = item.callingCode;
      // const textData = defaultText;
      const itemData = item.countryCode;
      const textData = defaultText;
      return itemData === textData;
    });
    return (
      <View>
        <View style={styles.selectedCountryContainer}>
          {hideCountryFlag ? null : (
            <Image
              source={{uri: newData[0].flag}}
              style={styles.countryFlagContainer}
            />
          )}
          {hideCountryCode ? null : (
            <Text style={selectedCountryTextStyle}>
              {'+' + newData[0]?.callingCode}
            </Text>
          )}

          {hideCountryShortName ? null : (
            <Text style={selectedCountryTextStyle}>{newData[0]?.code}</Text>
          )}

          <Image source={dropDownImage} style={styles.dropDownImageStyle} />
        </View>
      </View>
    );
  }

  _renderListItems(item, index) {
    return (
      <View>
        <TouchableOpacity onPress={() => this._listItemClickListener(item)}>
          <View style={styles.listViewRowContainer}>
            <Image
              source={{uri: item.flag}}
              style={styles.countryFlagContainer}
            />
            <Text style={this.props.countryNameTextStyle}>
              {item?.name?.en + ' (+' + item.callingCode + ')'}
            </Text>
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        <TouchableOpacity
          disabled={this.props.disable}
          onPress={() => this.setState({modalVisible: true})}
          activeOpacity={0.7}>
          <View style={styles.selectedCountryContainer}>
            {CountryPicker._selectDefaultCountry(
              this.props.countryCode,
              this.props.dropDownImage,
              this.props.hideCountryFlag,
              this.props.hideCountryCode,
              this.props.hideCountryShortName,
              this.props.selectedCountryTextStyle,
            )}
          </View>
        </TouchableOpacity>

        <Modal
          animationType={this.props.animationType}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View elevation={10} style={styles.searchBarContainer}>
            <TouchableOpacity
              disabled={this.props.disable}
              activeOpacity={0.5}
              style={styles.backBtnContainer}
              onPress={() =>
                this.setState({arrayData: CountryJSON, modalVisible: false})
              }>
              <Image
                resizeMode="contain"
                style={styles.backImageStyle}
                source={this.props.backButtonImage}
              />
            </TouchableOpacity>

            {this.state.hidePickerTitle ? null : (
              <Text style={this.props.pickerTitleStyle}>
                {this.props.pickerTitle}
              </Text>
            )}

            {this.state.hideSearchBar ? null : (
              <TextInput
                style={this.props.searchBarStyle}
                onChangeText={text => this._searchFilterFunction(text)}
                placeholder={this.props.searchBarPlaceHolder}
                keyboardType="default"
                returnKeyType={'done'}
                blurOnSubmit={true}
              />
            )}
            <Image
              resizeMode="contain"
              style={styles.searchImageStyle}
              source={this.props.searchButtonImage}
            />
          </View>

          <FlatList
            overScrollMode="never"
            contentContainerStyle={{paddingTop: 10, paddingBottom: 20}}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            initialNumToRender={50}
            data={this.state.arrayData}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => this._renderListItems(item, index)}
          />
        </Modal>
      </View>
    );
  }
}

CountryPicker.propTypes = {
  animationType: PropTypes.any,
  containerStyle: PropTypes.object,
  searchBarStyle: PropTypes.object,
  pickerTitleStyle: PropTypes.object,
  countryNameTextStyle: PropTypes.object,
  selectedCountryTextStyle: PropTypes.object,
  dropDownImage: PropTypes.any,
  backButtonImage: PropTypes.any,
  searchButtonImage: PropTypes.any,
  countryCode: PropTypes.any,
  hideCountryFlag: PropTypes.bool,
  hideCountryCode: PropTypes.bool,
  hideCountryShortName: PropTypes.bool,
  searchBarPlaceHolder: PropTypes.string,
  pickerTitle: PropTypes.string,
  disable: PropTypes.bool,
};
CountryPicker.defaultProps = {
  disable: false,
  animationType: 'slide',
  hideCountryFlag: false,
  hideCountryCode: false,
  hideCountryShortName: false,
  dropDownImage: ArrowDown,
  backButtonImage: BackBlack,
  searchButtonImage: Search,
  countryCode: '91',
};
const styles = StyleSheet.create({
  divider: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#D3D3D3',
    width: '95%',
    height: 0.8,
  },
  selectedCountryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listViewRowContainer: {
    flexDirection: 'row',
    paddingStart: 15,
    margin: 10,
    alignItems: 'center',
  },
  searchImageStyle: {
    width: wp(5),
    height: wp(5),
    alignSelf: 'center',
    marginRight: wp(3),
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  countryFlagContainer: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownImageStyle: {
    width: wp(3.3),
    height: hp(1.2),
    resizeMode: 'contain',
  },
  searchBarContainer: {
    paddingTop: PADDING_TOP,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOpacity: 1.0,
    backgroundColor: 'rgba(255,255,255,9)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: colors.shadow,
    width: '100%',
    marginTop: hp(5),
  },
  backBtnContainer: {
    paddingStart: 20,
    height: '100%',
    justifyContent: 'center',
  },
  backImageStyle: {
    width: wp(5),
    height: wp(5),
  },
});
