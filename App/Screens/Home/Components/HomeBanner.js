import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import CustomRouter from '../../../Navigation/CustomRouter'
import LoadableImage from '../../Common/Components/LoadableImage'

function HomeBanner({ navigation, asset, ratio, padding }) {
    const width = Dimensions.get('screen').width
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => CustomRouter.route(navigation, asset.c_mCustomNavigation) }>
            <View style={{width:width, height: width * ratio, marginBottom: padding > 0 ? 0 : 20, padding:padding} }>
                <LoadableImage uri={asset.c_mImage} resizeMode='cover'/>
            </View>
        </TouchableOpacity>
    );
}

export default HomeBanner;