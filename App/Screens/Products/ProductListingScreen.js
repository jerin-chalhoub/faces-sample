import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ProductListingCell from './Components/ProductListingCell'
import ProductListingShimmerCell from './Components/ProductListingShimmerCell'
import ProductService from '../../Shared/Services/ProductService' 
import { COLORS } from '../../Constants' 

function ProductListingScreen({ navigation, route }) {
    const [productsList, setProductsList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [cleanedUp, setCleanedUp] = useState(false);

    useEffect(() => {
      loadProducts();
      console.log(route.params.categoryId);

      return () => setCleanedUp(true);
    }, []);

    function loadProducts() {
      let offset = productsList.length
      ProductService.getProducts(offset, 20, route.params.categoryId, function(products, error) {
        if (cleanedUp) { return }
        if (error === null) {
          setProductsList([...productsList, ...products]);
        }
        setLoading(false);
        setLoadingMore(false);
      });
    }

    function loadMore() {
      if (isLoading || isLoadingMore) {
        return
      }
      setLoadingMore(true);
      loadProducts();
      console.log('Ennnnnd');
    }

    function renderFooter() {
      if (!isLoadingMore) return null;
      
      return (
        <View
          style={{
            paddingVertical: 20,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <ActivityIndicator animating color={COLORS.secondary} />
        </View>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList style={styles.gridView}
            data={ !isLoading ? productsList : [0, 1, 2, 3, 5, 6, 7, 8] }
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({ item }) => ( !isLoading ? <ProductListingCell style={styles.productListingCell} data = {item} navigation={navigation} /> : <ProductListingShimmerCell style={styles.productListingCell} data = {item} /> )}
            numColumns={2}
            keyExtractor={(item, index) => index}
            onEndReached = {loadMore}
            initialNumToRender={18}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter()}
          />
      </SafeAreaView>
    )
}

export default ProductListingScreen;

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
});