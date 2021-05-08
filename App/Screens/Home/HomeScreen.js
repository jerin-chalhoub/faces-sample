import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import ContentService from '../../Shared/Services/ContentService' 
import HomeBanner from './Components/HomeBanner'
import ProductCarousel from './Components/ProductCarousel'
import CategoryCarousel from './Components/CategoryCarousel'
import { COLORS } from "../../Constants"; 

function HomeScreen({ navigation }) {
    const [assets, setAssets] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    function loadContent() {
        ContentService.getHomeContent((data, error) => {
            setAssets(data);
            setLoading(false)
        });
    }

    function renderBanner(index, asset, ratio, padding) {
        return <HomeBanner key={index} asset={asset} navigation={navigation} ratio={ratio} padding={padding} />
    }

    function renderProductCarousel(index, asset) {
        return <ProductCarousel key={index} asset={asset} navigation={navigation} />
    }

    function renderCategoryCarousel(index, asset) {
        return <CategoryCarousel key={index} asset={asset} navigation={navigation} />
    }

    return (
        <SafeAreaView style={styles.container}>
            { !isLoading ? (
                <ScrollView style={styles.scrollView}>
                {assets.map((asset, index) => {
                    if (asset.c_mComponentType === 'Mobile-Home-Image-Banner-Large' && asset.c_mImage != undefined) {
                        return renderBanner(index, asset, 0.64, 0);
                    } else if (asset.c_mComponentType === 'Mobile-Home-Product-Carousel') {
                        return renderProductCarousel(index, asset);
                    } else if (asset.c_mComponentType === 'Mobile-Home-Category-Carousel') {
                        return renderCategoryCarousel(index, asset);
                    } else if (asset.c_mComponentType === 'Mobile-Home-Category-Carousel') {
                        return renderCategoryCarousel(index, asset);
                    } else if (asset.c_mComponentType === 'Mobile-Home-New-4x5-Image-Banner' && asset.c_mImage != undefined) {
                        return renderBanner(index, asset, 1.25, 20);
                    } else if (asset.c_mComponentType === 'Mobile-Home-New-1x010-Image-Banner' && asset.c_mImage != undefined) {
                        return renderBanner(index, asset, 0.1, 0);
                    } else if (asset.c_mComponentType === 'Mobile-Home-New-1x1-Image-Banner' && asset.c_mImage != undefined) {
                        return renderBanner(index, asset, 1, 20);
                    }
                })}
                </ScrollView>
            ) : (
                <ActivityIndicator style={styles.activity} size="large" color={COLORS.secondary}/>
            )
            }
        </SafeAreaView>
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    scrollView: {
      backgroundColor: COLORS.white,
    },
    activity:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
});