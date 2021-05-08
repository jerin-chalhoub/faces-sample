const initialState = {
    selectedLanguage: 'en'
};

function languageReducer(state = initialState, action={}) {
    switch (action.type) {
      case 'SET_LANGUAGE':
        return {
          ...state,
          selectedLanguage: action.payload,
        };
      default:
        return state;
    }
}
  
export default languageReducer;