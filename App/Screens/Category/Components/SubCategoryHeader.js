import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, I18nManager } from 'react-native';
import { COLORS, FONTS } from "../../../Constants"; 
import LoadableImage from '../../Common/Components/LoadableImage'
import CustomRouter from '../../../Navigation/CustomRouter'
import { t } from '../../../Shared/Lib/Localize'

const width = Dimensions.get('screen').width;

function SubCategoryHeader({ navigation, category }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <LoadableImage uri={ category.c_slotBannerImage ?? category.thumbnail }resizeMode='cover'/>
            </View>
            <View style={styles.textContainer} >
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    CustomRouter.route(navigation, 'category>'+category.id);
                }}>
                    <Text style={styles.text} >{ t('VIEW ALL') + category.name.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SubCategoryHeader;

const styles = StyleSheet.create({
    container: {
        height: 200,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 10
    },
    text: {
        ...FONTS.categoryTitle,
        textAlign: 'left',
        marginLeft: 15,
    },
    textContainer: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        height: 70,
    }
  });