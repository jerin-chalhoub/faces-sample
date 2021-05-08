import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, I18nManager } from 'react-native';
import { COLORS, FONTS } from "../../../Constants"; 
import LoadableImage from '../../Common/Components/LoadableImage'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import CustomRouter from '../../../Navigation/CustomRouter'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const width = Dimensions.get('screen').width;

function CategoryScreenItem({ navigation, data, showShimmer }) {

    const path = 'category>'+data.id;

    function shimmerComponent() {
        return (
            <View style={styles.container}>
                <ShimmerPlaceHolder style={styles.container}></ShimmerPlaceHolder>
            </View>
        )
    }

    function cellComponent() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => {
                data.categories !== undefined ? navigation.navigate('SubCategoryScreen', { category: data }) : CustomRouter.route(navigation, path);
            }}>
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.title}>{data.name.toUpperCase()}</Text> 
                <LoadableImage uri={data.thumbnail} style={styles.image} resizeMode='cover' />
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

export default CategoryScreenItem;

const styles = StyleSheet.create({
    container: {
        width: width - 20, 
        height: 100, 
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: COLORS.white,
        marginLeft: I18nManager.isRTL ? 10: 0
    },
    title: {
        ...FONTS.categoryTitle,
        textAlign: 'left',
        marginTop: 50,
        marginLeft: 15,
        flex: 2
    },
    image: {
        width: 200,
        alignContent: 'flex-end'
    }
  });