import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from "../../../Constants"; 

function PickerModel({ showPicker, setShowPicker, items, selectedValue = null, onValueSelected }) {
    const [selected, setSelected] = useState(selectedValue === null ? items[0] : selectedValue);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const donePress = () => {
        onValueSelected(selected, selectedIndex)
        setShowPicker(false)
    }

    return (
        <View>
            <Modal 
            isVisible={showPicker} 
            style={styles.pickerModel} >
                <View style={styles.pickerModelContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button title='Cancel' onPress={() => setShowPicker(false)}></Button>
                        <Button title='Done' onPress={() => donePress()}></Button>
                    </View>
                    <Picker
                        selectedValue={selected}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelected(itemValue);
                            setSelectedIndex(itemIndex)
                        }}>
                        {items.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index} />
                        ))}
                    </Picker>
                </View>
            </Modal>
        </View>
    );
}

export default PickerModel;

const styles = StyleSheet.create({
    pickerModel: {
        justifyContent: 'flex-end',
        margin: 0,
        height: 100,
    },
    pickerModelContainer: {
        height: 300, 
        backgroundColor: COLORS.white
    }
});