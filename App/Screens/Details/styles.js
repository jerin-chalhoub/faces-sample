import { StyleSheet } from 'react-native';
import { FONTS, COLORS, STYLES } from "../../Constants"; 

export const styles = StyleSheet.create({
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
    brand: {
      ...FONTS.pdpBrand,
      textAlign: 'center',
      marginTop: 30,
    },
    name: {
        ...FONTS.pdpName,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    shortDescription: {
        ...FONTS.pdpShortDescription,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    wasPrice: {
        ...FONTS.pdpShortDescription,
        textAlign: 'center',
        textDecorationLine: 'line-through',
        marginTop: 10,
    },
    button: {        
        ...STYLES.mainButton,
        height: 55,
    },
    buttonTitle: {
        ...STYLES.mainButtonTitle,
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selector: {
        width: 200,
        alignItems: 'center',
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
    },
    selectorText: {
        ...FONTS.pdpShortDescription,
        flex: 1,
        textAlign: 'center',
        color: COLORS.primary,
    },
    selectorArrow: {
        height: 10,
        width: 15,
        marginRight: 15
    },
    guaranteedContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height:40,
        marginTop: 20,
    },
    guaranteedIcon: {
        height: 15,
        width: 15,
    },
    guaranteedText: {
        ...FONTS.pdpName,
        fontSize: 11,
        color: COLORS.gray,
        marginLeft: 10,
        marginTop:2
    },
    noText: {
        ...FONTS.pdpBrand,
        fontSize: 16,
        color: COLORS.gray,
        marginTop:300,
        textAlign: 'center',
    },
});