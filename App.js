import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Tabbar from './App/Navigation/Tabbar';
import { setDefaultLanguage } from './App/Shared/Lib/Localize'
import store from './App/Shared/Store'

export default function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setDefaultLanguage((language) => {
      setLoading(false);
      store.dispatch({
        type: 'SET_LANGUAGE',
        payload: language
      });
    });
  }, []);

  return (
    <Provider store={store}>
      { isLoading ? <ActivityIndicator style={styles.activity}/> : <Tabbar /> }
    </Provider>
  );
}

const styles = StyleSheet.create({
  activity:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});

