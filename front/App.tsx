/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Node } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [selected, setSelcted] = useState<number[]>([]);
  useEffect(() => {
    getButtons();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPressButton = (index: number) => {
    const findIndex = selected.findIndex(e => e === index);
    if (findIndex > -1) {
      const copySelected = [...selected];
      copySelected.splice(findIndex, 1)
      setSelcted(copySelected);
    } else {
      selected.push(index);
      setSelcted([...selected]);
    }
  }

  const getButtons = () => {
    const buttonArray = new Array(61).fill('').map((e, i) => {
      return (
        <TouchableOpacity
          key={e + i}
          style={{
            backgroundColor: selected.includes(i) ? 'black' : 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            borderRadius: 10,
            minWidth: 100,
            maxWidth: 100,
            height: 40,
            borderWidth: 1,
            marginVertical: 10,
            marginHorizontal: 5,
          }}
          onPress={() => { onPressButton(i) }}
        >
          <Text style={{ color: selected.includes(i) ? 'white' : 'black', }}>{`DAY ${i + 1}`}</Text>
        </TouchableOpacity>
      );
    });
    return buttonArray;
  };

  const getWords = async (selected: number[]) => {
    try {
      const response = await axios.get('http://localhost:3603/words', {
        params: {
          selected: selected,
        },
      });
    } catch (error) {
      console.log('error:', error);
    }
  }

  const onPressStart = async () => {
    const words = await getWords(selected);
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text onPress={getButtons}>MEW</Text>
        <TouchableOpacity onPress={onPressStart}>
          <Image
            source={{
              uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
            }}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', width: 400, flexWrap: 'wrap', justifyContent: 'center' }}>
          {getButtons()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
