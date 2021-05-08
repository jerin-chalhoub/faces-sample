import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import PageControl from 'react-native-page-control';
import { COLORS} from "../../../Constants"; 
import LoadableImage from '../../Common/Components/LoadableImage';

const width = Dimensions.get('window').width;

class ImageSlider extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };
        this.onScroll = this.onScroll.bind(this)
    }

    onScroll(e) {
        let page = Math.ceil(((e.nativeEvent.contentOffset.x - width) / width));
        this.setState({
            currentPage: page
        });
    };

    renderImage(imageUrl) {
        return ( 
            <View style={{width:width, height: width, flex: 1}}>
                <LoadableImage uri={imageUrl} resizeMode='contain' style={{width:width, height: width}} width={width}></LoadableImage>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList style={styles.gridView}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={ this.props.images }
                    renderItem={({ item }) =>  this.renderImage(item) }
                    keyExtractor={(item, index) => index}
                    onScroll={this.onScroll}
                />
                <PageControl
                    style={styles.pageControl}
                    numberOfPages={this.props.images.length}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    pageIndicatorTintColor={COLORS.gray}
                    currentPageIndicatorTintColor={COLORS.secondary}
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:6, height:6}}
                />
            </View>
        );
    }
}

export default ImageSlider;

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      height: width,
      backgroundColor: '#fff',
    },
    activity:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    pageControl: {
        paddingTop: 20,
    }
});