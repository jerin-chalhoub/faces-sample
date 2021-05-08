import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Dimensions } from 'react-native';
import CategoryScreenItem from './Components/CategoryScreenItem'
import CategoryService from '../../Shared/Services/CategoryService' 
import { COLORS, STYLES, FONTS } from "../../Constants"; 

const width = Dimensions.get('window').width;

function CategoryScreen({ navigation }) {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        CategoryService.getCategory('root', (categories, error) => {
            const filtered = categories[0].categories.filter(cat => cat.c_showInMenu == true) 
            setCategoryList(filtered);
            setLoading(false);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList style={styles.gridView}
                data={ !isLoading ? categoryList : [0, 1, 2, 3, 5, 6, 7, 8] }
                renderItem={({ item }) => ( <CategoryScreenItem style={styles.item} data = {item} showShimmer={isLoading} navigation={navigation}/>  )}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    )
}

export default CategoryScreen;

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    activity:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    item: {
      margin: 15,
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