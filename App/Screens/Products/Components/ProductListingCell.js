import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, I18nManager } from 'react-native';
import { STYLES, FONTS } from "../../../Constants"; 
import { formatPrice } from "../../../Shared/Lib/Formatter"; 
import { t } from '../../../Shared/Lib/Localize'
import LoadableImage from '../../Common/Components/LoadableImage'
import CustomRouter from '../../../Navigation/CustomRouter'

const width = (Dimensions.get('screen').width / 2);

function ProductListingCell({ navigation, data }) {

    const path = 'product>'+data.id;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{height:width - 20}} onPress={() => CustomRouter.route(navigation, path)} >
                <LoadableImage uri={data.image} style={{height:width}} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.title}>{data.brand}</Text>
            <Text numberOfLines={1} style={styles.subTitle}>{data.name}</Text>
            <Text numberOfLines={1} style={styles.price}>{ data.isPriceRange() ? formatPrice(data.minPrice()) + ' - ' + formatPrice(data.maxPrice()) : formatPrice(data.salePrice()) }
            </Text>
            <Text numberOfLines={1} style={styles.wasPice}>{ data.salePrice() < data.listPrice() ? formatPrice(data.listPrice()) : ''}</Text>
            <TouchableOpacity style={styles.button} >
                <Text numberOfLines={1} style={styles.buttonTitle}>{t('Add to Cart')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProductListingCell;

const styles = StyleSheet.create({
    container: {
        width:width - 15, 
        height: width + 130, 
        marginLeft: I18nManager.isRTL ? 10: 0
    },
    title: {
        ...FONTS.plpTitle,
        textAlign: 'center',
        marginTop: 10,
    },
    subTitle: {
        ...FONTS.plpSubTitle,
        textAlign: 'center',
        marginTop: 10,
    },
    price: {
        ...FONTS.plpPrice,
        textAlign: 'center',
        marginTop: 10,
    },
    wasPice: {
        ...FONTS.plpWasPrice,
        textAlign: 'center',
        marginTop: 3,
        textDecorationLine: 'line-through',
    },
    button: {
        ...STYLES.mainButton,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonTitle: {
        ...STYLES.mainButtonTitle,
    }
  });