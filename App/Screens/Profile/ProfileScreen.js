import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import RNRestart from 'react-native-restart'; 
import { setLanguage, t } from '../../Shared/Lib/Localize'

function ProfileScreen(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{t('tab_profile')}</Text>
            <Button
                title={props.selectedLanguage === 'ar' ? "Change to English" : "Change to Arabic"}
                onPress={() => {
                    setLanguage(props.selectedLanguage === 'ar' ? 'en' : 'ar', function() {
                        RNRestart.Restart();
                    })
                }}
            />
        </View>
    );
}

const mapStateToProps = (state) => {
    const { selectedLanguage } = state
    return { selectedLanguage }
};

export default connect(mapStateToProps)(ProfileScreen);