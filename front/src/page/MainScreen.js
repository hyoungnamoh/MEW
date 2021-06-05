import { useFocusEffect } from "@react-navigation/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MainScreen = ({ route, navigation }) => {
  const [selected, setSelcted] = useState([]);
  useEffect(() => {
    getButtons();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSelcted([]);
      return () => {
      };
    }, [])
  );

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

  const onPressButton = (index) => {
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

  const getWords = async (selected) => {
    try {
      const response = await axios.get('http://192.168.219.106/words', {
        params: {
          selected: selected,
        },
      });
      return response.data;
    } catch (error) {
      console.log('getWords:', error);
    }
  }

  const onPressMEW = async () => {
    const data = await getWords(selected);
    if (!data) {
      return Alert.alert('시험부터 선택하시죠 ㅡㅅㅡ');
    }
    navigation.push('SelectQuestionsCountScreen', {
      data,
      selected,
    })
  }
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Text onPress={getButtons}>MEW</Text>
      <TouchableOpacity onPress={onPressMEW}>
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
  )
}

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

export default MainScreen;