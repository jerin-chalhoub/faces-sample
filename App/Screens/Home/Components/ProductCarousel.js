import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions,I18nManager } from 'react-native';
import PageControl from 'react-native-page-control';
import ProductListingCell from '../../Products/Components/ProductListingCell'
import ProductListingShimmerCell from '../../Products/Components/ProductListingShimmerCell'
import ProductService from '../../../Shared/Services/ProductService' 
import { COLORS, STYLES } from "../../../Constants"; 

const width = Dimensions.get('window').width;

function ProductCarousel({ navigation, asset }) {
    const [productsList, setProductsList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadProducts();
    }, []);

    function loadProducts() {
        ProductService.getProductsByIDs(asset.c_mResponseIds, (products, error) => {
            setProductsList(products);
            setLoading(false);
        })
    }

    function onScroll(e) {
        let page = Math.ceil(((e.nativeEvent.contentOffset.x - width / 2) / width));
        setCurrentPage(page)
    };

    function renderItemSeperator() {
        return <View style={styles.seperator}></View>
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{asset.c_mTitle}</Text>
        <FlatList style={styles.gridView}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={ !isLoading ? productsList : [0, 1, 2, 3, 5, 6, 7, 8] }
            renderItem={({ item }) => ( !isLoading ? <ProductListingCell style={styles.productListingCell} data = {item} navigation={navigation} /> : <ProductListingShimmerCell style={styles.productListingCell} data = {item} /> )}
            keyExtractor={(item, index) => index}
            onScroll={onScroll}
            ItemSeparatorComponent={renderItemSeperator}
        />
        <PageControl
            style={styles.pageControl}
            numberOfPages={productsList.length / 2}
            currentPage={currentPage}
            hidesForSinglePage
            pageIndicatorTintColor={COLORS.gray}
            currentPageIndicatorTintColor={COLORS.secondary}
            indicatorStyle={{borderRadius: 5}}
            currentIndicatorStyle={{borderRadius: 5}}
            indicatorSize={{width:6, height:6}}
        />
    </View>
    )
}

export default ProductCarousel;

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    activity:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    productListingCell: {
      margin: 10,
    },
    seperator: {
        width: I18nManager.isRTL ? 0: 10,
    },
    title: {
        ...STYLES.carouselTitle,
        backgroundColor: COLORS.white,
        paddingTop: 20,
        paddingBottom: 20
    },
    pageControl: {
        paddingTop: 0,
        paddingBottom: 20
    }
});