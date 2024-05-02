import React, {createContext, useRef} from 'react';
import {View, LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/reduxStore';
import AppRoutes from './src/navigation/routes';
import globalStyles from './src/styles';
import {initiateEmptyStore} from './src/models';
import {Loader} from './src/components';

initiateEmptyStore();

LogBox.ignoreAllLogs();
const App = () => {
  const AppContext = createContext({});
  const AppProvider = props => {
    const loader = useRef();

    const globalFunc = {
      startLoader: () => loader?.current.start(),
      stopLoader: () => loader?.current.stop(),
      isLoading: () => loader?.current.isLoading(),
    };

    return (
      <AppContext.Provider value={{...globalFunc}}>
        {props.children}
        <Loader ref={loader} />
      </AppContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <AppProvider>
        <AppContext.Consumer>
          {funcs => {
            global.props = {...funcs};
            return (
              <View {...funcs} style={globalStyles.flex}>
                <StatusBar barStyle="dark-content" />
                <AppRoutes />
              </View>
            );
          }}
        </AppContext.Consumer>
      </AppProvider>
    </Provider>
  );
};

export default App;
