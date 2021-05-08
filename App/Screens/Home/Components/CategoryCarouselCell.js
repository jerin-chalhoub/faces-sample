import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FONTS } from "../../../Constants"; 
import LoadableImage from '../../Common/Components/LoadableImage'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import CustomRouter from '../../../Navigation/CustomRouter'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

function CategoryCarouselCell({ navigation, data, showShimmer }) {

    const width = (Dimensions.get('screen').width / 2);
    const path = 'category>'+data.id;

    function shimmerComponent() {
        return (
            <View style={{width:width - 15, height: width + 30} }>
                <ShimmerPlaceHolder width={width - 15} style={{height:width}}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder width={width - 15} style={styles.title}></ShimmerPlaceHolder> 
            </View>
        )

    }

    function cellComponent() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => CustomRouter.route(navigation, path) }>
            <View style={{width:width - 15, height: width + 30} }>
                <LoadableImage uri={data.thumbnail} style={{height:width}} />
                <Text numberOfLines={1} style={styles.title}>{data.name}</Text> 
            </View>
            </TouchableOpacity>
        );
    }

    return (
        <View >
            { showShimmer === true ? shimmerComponent() : cellComponent()}
        </View>
    );
}

export default CategoryCarouselCell;

const styles = StyleSheet.create({
    title: {
        ...FONTS.plpTitle,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    }
  });