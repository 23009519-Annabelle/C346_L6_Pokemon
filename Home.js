import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { datasource as initialDatasource } from './Data.js'; // Import your initial datasource

const renderSectionHeader = ({ section: { title, bgcolor, icon, textColor } }) => (
  <View style={[styles.headerContainer, { backgroundColor: bgcolor }]}>
    <FontAwesomeIcon icon={icon} size={30} color="black" />
    <Text style={[styles.headerText, { color: textColor }]}>{title}</Text>
  </View>
);

const Home = ({ navigation, route }) => {
  // Initialize state with the initial datasource
  const [datasource, setDatasource] = useState(initialDatasource);

  useEffect(() => {
    // Update the datasource if updatedDatasource is passed from Edit component
    if (route.params?.updatedDatasource) {
      setDatasource(route.params.updatedDatasource);
    }
  }, [route.params?.updatedDatasource]); // Only run this effect when updatedDatasource changes

  // Log the datasource to debug
  console.log("Datasource:", datasource);

  // Check if datasource is defined and is an array
  if (!Array.isArray(datasource) || datasource.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available.</Text>
      </View>
    );
  }

  const renderItem = ({ item, index, section }) => {
    const updatedImage = `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.cardNumber}.png`;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit', { 
          index, 
          type: section.title, 
          pokemon: item.key, 
          cardNumber: item.cardNumber,
          isNew: false 
        })}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.key}</Text>
          </View>
          <Image source={{ uri: updatedImage }} style={styles.imageStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.buttonContainer}>
        <Button title="ADD POKEMON" onPress={() => { navigation.navigate('Add') }} />
      </View>
      <SectionList
        sections={datasource}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.cardNumber.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F0F0F0',
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#CBC3E3',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default Home;