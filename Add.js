import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data.js';

const Add = ({ navigation }) => {
    const [pokemon, setPokemon] = useState('');
    const [type, setType] = useState('Electric');
    const [cardNumber, setCardNumber] = useState('');
    const [imageUri, setImageUri] = useState('');

    const handleCardNumberChange = (number) => {
        setCardNumber(number);
        if (number) {
            // Adjust the base URL according to your requirements
            setImageUri(`https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${number}.png`);
        } else {
            setImageUri('');
        }
    };

    const handleSubmit = () => {
        let newItem = { key: pokemon, cardNumber };
        let sectionIndex = 1; // Default to Fire
        if (type === 'Electric') {
            sectionIndex = 0;
        } else if (type === 'Water') {
            sectionIndex = 2;
        } else if (type === 'Grass') {
            sectionIndex = 3;
        }

        // Clone `datasource` before updating
        let updatedDatasource = [...datasource];
        updatedDatasource[sectionIndex] = {
            ...updatedDatasource[sectionIndex],
            data: [...updatedDatasource[sectionIndex].data, newItem],
        };

        // Navigate back with updated `datasource`
        navigation.navigate('Home', { updatedDatasource });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokemon Name:</Text>
            <TextInput
                style={styles.textBox}
                onChangeText={setPokemon}
                placeholder="Enter a Pokemon"
            />
            <Text style={styles.label}>Pokemon Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Electric', value: 'Electric' },
                    { label: 'Fire', value: 'Fire' },
                    { label: 'Water', value: 'Water' },
                    { label: 'Grass', value: 'Grass' },
                ]}
                value={type}
            />
            <Text style={styles.label}>Card Number:</Text>
            <TextInput
                style={styles.textBox}
                onChangeText={handleCardNumberChange}
                placeholder="Enter Card Number"
                keyboardType="numeric"
            />
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imageStyle} />
            ) : null}
            <Button title="Submit" onPress={handleSubmit} />
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

export default Add;
