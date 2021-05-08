import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import HTML from "react-native-render-html";
import { FONTS, COLORS } from "../../../Constants"; 

const regex = /(style=(\"|')[^(\"|')]*(\"|'))/ig; 

const stripStyle = (value) => {
    return value.replace(regex, '')
}

function DetailsSection({title, description}) {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <View style={styles.seperator}></View>
          <View style={{margin: 15}}>
              <HTML 
                source={{ html: '<div>' + stripStyle(description) + '</div>' }}
                tagsStyles={{ div: { ...FONTS.pdpShortDescription, lineHeight: 20, textAlign: 'left' }}}
                />
          </View>
          <View style={styles.seperator}></View>
      </View>
    )
}

export default DetailsSection;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 5
    },
    title: {
        ...FONTS.pdpName,
        margin: 15,
        textAlign: 'left'
    },
    seperator: {
        height: 1,
        backgroundColor: COLORS.gray,
        marginLeft: 15,
        marginRight: 15,
    }
});