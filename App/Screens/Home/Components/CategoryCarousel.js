import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import PageControl from 'react-native-page-control';
import CategoryCarouselCell from './CategoryCarouselCell'
import CategoryService from '../../../Shared/Services/CategoryService' 
import { COLORS, STYLES, FONTS } from "../../../Constants"; 

const width = Dimensions.get('window').width;

function CategoryCarousel({ navigation, asset }) {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        CategoryService.getCategories(asset.c_mResponseIds, (categories, error) => {
            setCategoryList(categories);
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
            data={ !isLoading ? categoryList : [0, 1, 2, 3, 5, 6, 7, 8] }
            renderItem={({ item }) => ( <CategoryCarouselCell style={styles.productListingCell} data = {item} showShimmer={isLoading} navigation={navigation}/>  )}
            keyExtractor={(item, index) => index}
            onScroll={onScroll}
            ItemSeparatorComponent={renderItemSeperator}
        />
        <PageControl
            style={styles.pageControl}
            numberOfPages={categoryList.length / 2}
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

export default CategoryCarousel;

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
        width: 10,
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