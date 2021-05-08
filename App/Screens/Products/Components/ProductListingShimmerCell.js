import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

function ProductListingShimmerCell({ data }) {

    const width = (Dimensions.get('screen').width / 2);

    return (
        <View style={{width:width - 15, height:width + 100} }>
            <ShimmerPlaceHolder width={width - 15} style={{height:width}}></ShimmerPlaceHolder>
            <ShimmerPlaceHolder width={width - 15} style={styles.title}></ShimmerPlaceHolder>
            <ShimmerPlaceHolder width={width - 15} style={styles.subTitle}></ShimmerPlaceHolder>
            <View width={width - 15} style={{alignItems: 'center'}}><View style={{backgroundColor: '#ff00ff', flex:1}}><ShimmerPlaceHolder width={70} style={styles.price}></ShimmerPlaceHolder></View></View>
            <ShimmerPlaceHolder width={width - 15} style={styles.button}></ShimmerPlaceHolder>
        </View>
    );
}

export default ProductListingShimmerCell;

const styles = StyleSheet.create({
    title: {
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
    },
    subTitle: {
        marginTop: 5,
        backgroundColor: '#f5f5f5',
    },
    price: {
        marginTop: 5,
        backgroundColor: '#f5f5f5',
    },
    button: {
        marginTop: 25,
        height: 30,
        backgroundColor: '#f5f5f5',
    },
  });
