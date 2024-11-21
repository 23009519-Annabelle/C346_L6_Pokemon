import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';



const Edit = ({ navigation, route }) => {
    const { pokemon, cardNumber: initialCardNumber, type, index, isNew, addedPokemons } = route.params || {};

    const [name, setName] = useState(pokemon);
    const [cardNumber, setCardNumber] = useState(initialCardNumber);
    const [imageUri, setImageUri] = useState(
        `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${initialCardNumber}.png`
    );
    const [selectedType, setSelectedType] = useState(type);

    const getSectionIndex = (type) => {
        switch (type) {
            case 'Electric':
                return 0;
            case 'Fire':
                return 1;
            case 'Water':
                return 2;
            case 'Grass':
                return 3;
            default:
                return 0;
        }
    };

    const handleDelete = () => {
        const sectionIndex = getSectionIndex(selectedType);
    
        // Create a new copy of the datasource to avoid mutating the original
        const updatedDatasource = datasource.map((section, sectionIdx) => ({
            ...section,
            data: sectionIdx === sectionIndex
                ? section.data.filter((_, dataIdx) => dataIdx !== index)  // Correctly use `index` for the data item
                : section.data,
        }));
    
        Alert.alert('Are you sure you want to delete this Pokémon?', '', [
            {
                text: 'Yes',
                onPress: () => {
                    // After deletion, navigate with updatedDatasource
                    navigation.navigate('Home', { updatedDatasource });
                },
            },
            { text: 'No' },
        ]);
    };
    
    
    const handleSave = () => {
        const currentSectionIndex = getSectionIndex(type);
        const newSectionIndex = getSectionIndex(selectedType);
    
        const updatedDatasource = datasource.map((section, sectionIdx) => {
            let updatedData = section.data;
    
            if (sectionIdx === currentSectionIndex) {
                // Remove the item from the current section
                updatedData = section.data.filter((_, dataIdx) => dataIdx !== index);
            }
    
            if (sectionIdx === newSectionIndex) {
                // Add the new data to the new section
                updatedData = [...updatedData, { key: name, cardNumber, type: selectedType }];
            }
    
            return { ...section, data: updatedData };
        });
    
        navigation.navigate('Home', { updatedDatasource });
    };
    
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokemon Name:</Text>
            <TextInput value={name} style={styles.textBox} onChangeText={setName} />

            <Text style={styles.label}>Pokemon Type:</Text>
            <RNPickerSelect
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
                items={[
                    { label: 'Electric', value: 'Electric' },
                    { label: 'Fire', value: 'Fire' },
                    { label: 'Water', value: 'Water' },
                    { label: 'Grass', value: 'Grass' },
                ]}
            />

            <Text style={styles.label}>Card Number:</Text>
            <TextInput
                value={cardNumber}
                style={styles.textBox}
                onChangeText={(number) => {
                    setCardNumber(number);
                    setImageUri(
                        number
                            ? `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${number}.png`
                            : ''
                    );
                }}
                keyboardType="numeric"
            />

            {imageUri ? <Image source={{ uri: imageUri }} style={styles.imageStyle} /> : null}

            <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button title="Delete" onPress={handleDelete} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    imageStyle: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});

export default Edit;