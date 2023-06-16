import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type FirstLast = {
  first: number;
  last: number;
};

type Region = {
  [name: string]: FirstLast;
};

type m = {
  id: number[];
  uri: string[];
};

interface Props {
  region: string;
}

const Regions = ({ onRegionPress }: { onRegionPress: (region: number) => void }) => {
  const renderRegions = () => {
    const regions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return regions.map(region => (
      <TouchableOpacity
        key={region}
        style={styles.regionView}
        onPress={() => onRegionPress(region)}>
        <Text style={styles.regionText}>{region}</Text>
      </TouchableOpacity>
    ));
  };

  return <View style={styles.separation}>{renderRegions()}</View>;
};

export default function PokedexRegionScreen({
                                              region: initialRegion = 'kanto',
                                            }: Props): JSX.Element {
  const [region, setRegion] = useState(initialRegion);
  const navigation = useNavigation();

  const generations: Region = {
    kanto: { first: 1, last: 151 },
    johto: { first: 152, last: 251 },
    hoenn: { first: 252, last: 386 },
    sinnoh: { first: 387, last: 493 },
    unova: { first: 494, last: 649 },
    kalos: { first: 650, last: 721 },
    alola: { first: 722, last: 809 },
    galar: { first: 810, last: 905 },
    Paldea: { first: 906, last: 1010 },
  };

  const imagesPokemon: m = { id: [], uri: [] };

  for (let i: number = generations[region].first; i <= generations[region].last; i++) {
    imagesPokemon.id.push(i);
    imagesPokemon.uri.push(
      'https://raw.githubusercontent.com/PokeAPI/' +
      'sprites/master/sprites/pokemon/other/official-artwork/' +
      i +
      '.png',
    );
  }

  const handleRegionPress = (region: number) => {
    let selectedRegion = '';
    switch (region) {
      case 1:
        selectedRegion = 'kanto';
        break;
      case 2:
        selectedRegion = 'johto';
        break;
      case 3:
        selectedRegion = 'hoenn';
        break;
      case 4:
        selectedRegion = 'sinnoh';
        break;
      case 5:
        selectedRegion = 'unova';
        break;
      case 6:
        selectedRegion = 'kalos';
        break;
      case 7:
        selectedRegion = 'alola';
        break;
      case 8:
        selectedRegion = 'galar';
        break;
      case 9:
        selectedRegion = 'Paldea';
        break;
      default:
        selectedRegion = 'kanto';
        break;
    }
    setRegion(selectedRegion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.separation}>
        <Regions onRegionPress={handleRegionPress} />
      </View>
      <FlatList
        style={styles.flatList}
        data={imagesPokemon.uri}
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.imageShadow}>
            <Text
              style={{
                position: 'absolute',
                top: 2,
                left: 2,
                color: '#1C2942',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              {imagesPokemon.id[imagesPokemon.uri.indexOf(item)]}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  id: imagesPokemon.id[imagesPokemon.uri.indexOf(item)],
                })
              }>
              <Image source={{ uri: item }} style={styles.sprite} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item: string, index: number) => index.toString()}
        horizontal={false}
        scrollEnabled={true}
        contentContainerStyle={styles.listView}
        contentInset={{ bottom: 100 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  region: {
    color: '#1C2942',
    fontSize: 24,
    fontFamily: 'Roboto',
    marginTop: 5,
  },
  separation: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
    flexDirection: 'row',
    height: 40,
  },
  back: {
    marginTop: 7,
    marginLeft: 7,
    width: 30,
    aspectRatio: 1,
  },
  sprite: {
    width: '80%',
    aspectRatio: 1,
    marginLeft: '10%',
  },
  listView: {
    paddingBottom: 80,
  },
  flatList: {
    width: '100%',
    paddingBottom: 100,
  },
  safeArea: {
    flex: 1,
  },
  imageShadow: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 10,
    margin: '1%',
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
    backgroundColor: '#fff',
  },
  regionView: {
    backgroundColor: '#FFFFFF',
    height: '80%',
    width: '9%',
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  regionText: {
    color: 'black',
  },
});
