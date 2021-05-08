import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { CommonImages } from '../../../Constants/images'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

function LoadableImage({ uri, resizeMode = 'contain', width }) {
    const [isLoading, setLoading] = useState(true);
    const [source, setSource] = useState( {uri: uri} );

    function onLoadEnd() {
        if (isLoading) {
            setLoading(false);
        }
    }
    function onError() {
        setSource(CommonImages.PlaceHolder)
    }
    return (
        <View style={styles.container}>
            <Image source={source} style={{flex: 1, width: width}} resizeMode={resizeMode} onLoadEnd={() => onLoadEnd()} onError={() => onError()}/>
            <ShimmerPlaceHolder style={styles.placeHolder} visible={!isLoading}></ShimmerPlaceHolder>
        </View>
    );
}
export default LoadableImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    placeHolder: {
        position: 'absolute',
        left: 0,
        top: 9,
        height: '92%',
        width: '100%'
    }
  })
