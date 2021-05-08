import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Dimensions, View, Text , TouchableOpacity} from 'react-native';
import SubCategoryHeader from './Components/SubCategoryHeader'
import { COLORS, FONTS } from "../../Constants"; 
import CustomRouter from '../../Navigation/CustomRouter'

const width = Dimensions.get('window').width;

function SubCategoryScreen({ navigation, route }) {
    const categoryList = [route.params.category, ...route.params.category.categories];

    useEffect(() => {
        navigation.setOptions({ title: route.params.category.name.toUpperCase() })
    }, []);

    const renderCategoryItem = (item) => {
      return (
        <View style={styles.textContainer} >
            <TouchableOpacity activeOpacity={1} onPress={() => {
                CustomRouter.route(navigation, 'category>'+item.id);
            }}>
              <Text style={styles.text} >{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
      )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
           <FlatList style={styles.gridView}
                data={ categoryList}
                renderItem={({ item, index }) => index == 0 ? <SubCategoryHeader category={item} navigation={navigation} /> : renderCategoryItem(item)}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    )
}

export default SubCategoryScreen;

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      backgroundColor: '#f5f5f5',
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
      marginBottom: 10
  }
});