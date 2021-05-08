import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, ScrollView, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import ProductService from '../../Shared/Services/ProductService' 
import ImageSlider from './Components/ImageSlider'
import PickerModel from './Components/PickerModel'
import DetailsSection from './Components/DetailsSection'
import { COLORS } from "../../Constants"; 
import { CommonImages } from "../../Constants/images"; 
import { formatPrice } from "../../Shared/Lib/Formatter"; 
import { t } from '../../Shared/Lib/Localize'
import { styles } from './styles'

const regex = /(<([^>]+)>)/ig; 

function DetailsScreen({ navigation, route }) {
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [cleanedUp, setCleanedUp] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedVarient, setSelectedVariant] = useState(null);

    useEffect(() => {
        loadProduct();
        console.log(route.params.productId);

        return () => setCleanedUp(true);
    }, []);

    function loadProduct() {
      ProductService.getProduct(route.params.productId, (product, error) => {
        if (cleanedUp) { return }
        if (error === null && product.name !== undefined) {
            setProduct(product);
            navigation.setOptions({ title: product.name })
        }
        setLoading(false)
      });
    }

    function pickerSelected(value, index) {
        setSelectedVariant(value);
    }

    function getImages(product) {
        const groups = product?.image_groups[0].images
        const images = groups.map(x => x.dis_base_link);
        return images;
    }

    function getPrice(price) {
        if (price.type === 'range') {
            return formatPrice(price.min?.sales?.value ?? 0) + ' - ' + formatPrice(price.min?.sales?.value ?? 0);
        } else {
            return formatPrice(price.sales?.value ?? 0);
        }
    }

    function getWasPrice(price) {
        if ((price.sales?.value ?? 0) < (price.list?.value ?? 0)) {
            return formatPrice(price.list?.value ?? 0);
        }
    }

    function picker() {

        const items = product?.variants.map(variant => {
            const itemName = variant.variation_values?.size !== undefined ?  variant.variation_values.size : 
                variant.variation_values?.color !== undefined ? variant.variation_values.color : '-';
            return itemName + ' - ' + formatPrice(variant.price ?? 0);
        });

        return (
            <PickerModel 
                showPicker={showPicker} 
                setShowPicker={setShowPicker} 
                items={items} 
                selectedValue={selectedVarient}
                onValueSelected={pickerSelected} />
        );
    }

    function detailsSection() {
        return (
            <View>
                { product.long_description !== undefined ? <DetailsSection title={t('Product Description')} description={product.long_description}/> : null }
                { product.c_application !== undefined ? <DetailsSection title={t('How to use')} description={product.c_application}/> : null }
            </View>
        )
    }

    function renderDetails() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
                    <ImageSlider images={getImages(product)}></ImageSlider>
                    <Text style={styles.brand}>{product.c_brand.toUpperCase()}</Text>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.shortDescription}>{product.short_description?.replace(regex, '')}</Text>
                    <Text style={styles.brand}>{getPrice(product.c_price)}</Text>
                    <Text style={styles.wasPrice}>{getWasPrice(product.c_price)}</Text>
                    { product.variants !== undefined ? (
                        <View style={styles.selectorContainer}>
                            <TouchableOpacity style={styles.selector} onPress={() => setShowPicker(true)} >
                                <Text numberOfLines={1} style={styles.selectorText}>{ selectedVarient == null ? t('SELECT') : selectedVarient }</Text>
                                <Image source={CommonImages.ArrowDown} style={styles.selectorArrow} />
                            </TouchableOpacity>
                            {picker()}
                        </View>
                    ) : ( null ) }
                    <View style={styles.guaranteedContainer}>
                        <Image source={CommonImages.PDPGuarenteeIcon} style={styles.guaranteedIcon} />
                        <Text numberOfLines={1} style={styles.guaranteedText}>{t('Guaranteed 100% authentic')}</Text>
                    </View>
                    { detailsSection() }
                </ScrollView>
                <TouchableOpacity style={styles.button} >
                    <Text numberOfLines={1} style={styles.buttonTitle}>{t('Add to Cart')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
            { isLoading ? ( 
                <ActivityIndicator style={styles.activity} size="large" color={COLORS.secondary} /> 
            ) : ( 
                product !== null ? ( 
                    renderDetails() 
                ) : (
                    <Text style={styles.noText} >Product not found</Text> 
                )
            )}
      </SafeAreaView>
    )
}

export default DetailsScreen;
