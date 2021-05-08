import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

const FontNames = {
    gouthamBook: "Gotham-Book",
    gouthamMedium: "Gotham-Medium"
}

export const COLORS  = {
    primary: "#000000",
    white: "#FFFFFF",
    lightGray: "#ABAFB8",
    gray: "#BEC1D2",
    secondary: "#8f1941",
}

export const SIZES = {
    //fontSizes
    plpTitle: 12,
    plpSubTitle: 12,
    plpPrice: 12,
    plpWasPrice: 10,

    //dimension
    width,
    height
}

export const FONTS = {
    navigationTitle: { fontFamily: FontNames.gouthamMedium, fontSize: 16, color: COLORS.primary },
    plpTitle: { fontFamily: FontNames.gouthamMedium, fontSize: SIZES.plpTitle, color: COLORS.primary },
    plpSubTitle: { fontFamily: FontNames.gouthamBook, fontSize: SIZES.plpSubTitle, color: COLORS.primary },
    plpPrice: { fontFamily: FontNames.gouthamMedium, fontSize: SIZES.plpPrice, color: COLORS.primary },
    plpWasPrice: { fontFamily: FontNames.gouthamBook, fontSize: SIZES.plpWasPrice, color: COLORS.primary },
    categoryTitle: { fontFamily: FontNames.gouthamBook, fontSize: 16, color: COLORS.primary },
    pdpBrand: { fontFamily: FontNames.gouthamMedium, fontSize:16, color: COLORS.primary },
    pdpName: { fontFamily: FontNames.gouthamBook, fontSize: 16, color: COLORS.primary },
    pdpShortDescription: { fontFamily: FontNames.gouthamBook, fontSize: 14, color: COLORS.primary },
};

export const STYLES = {
    mainButton: { 
        backgroundColor: COLORS.secondary,
        height: 40, 
        justifyContent: 'center',
    },
    mainButtonTitle: { 
        fontFamily: FontNames.gouthamMedium, 
        fontSize: 13, 
        color: COLORS.white,
        textAlign: 'center',
    },
    carouselTitle: { 
        fontFamily: FontNames.gouthamMedium, 
        fontSize: 16, 
        color: COLORS.primary,
        textAlign: 'center',
    },
};

const customTheme  = {COLORS, SIZES, FONTS, STYLES};

export default customTheme;