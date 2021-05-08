import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { I18nManager } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../Store'
import setLanguageAction from '../Store/actions'

const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    ar: () => require("../../../assets/translations/ar.json"),
    en: () => require("../../../assets/translations/en.json")
  };
  
const t = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );

const setDefaultLanguage = (completion) => {

    // Check for saved language
    AsyncStorage.getItem("language_key", function(error, result) {

        if (result != null) {
            const { languageTag, isRTL } = { languageTag: result, isRTL: result === "ar" ? true : false };
            setLanguage(languageTag, completion)
        } else {
            const fallback = { languageTag: "en", isRTL: false };
            const { languageTag, isRTL } =
                RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
                fallback; 
            setLanguage(languageTag, completion)
        }
    });
}

const setLanguage = (languageTag, completion) => {

    const isRTL = languageTag === 'ar' ? true : false
    // clear translation cache
    t.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;

    currentLanguage = languageTag

    AsyncStorage.setItem("language_key", languageTag, function(error) {
        completion(languageTag);
    })
}



module.exports = {
    setDefaultLanguage,
    setLanguage,
    t
  };