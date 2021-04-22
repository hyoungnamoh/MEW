import { Text, TouchableOpacity, View } from "react-native";
import React from 'react';

const SelectQuestionsCountScreen = ({ route, navigation }) => {
  console.log(route.params.data);
  const onPressStart = (count) => {
    navigation.push('TestScreen', {
      data: route.params.data,
      count,
      selected: route.params.selected,
    });
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderRadius: 10,
          height: 60,
          borderWidth: 1,
          marginVertical: 10,
          marginHorizontal: 5,
        }}
        onPress={() => { onPressStart() }}
      >
        <Text>Daily Test</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderRadius: 10,
          height: 60,
          borderWidth: 1,
          marginVertical: 10,
          marginHorizontal: 5,
        }}
        onPress={() => { onPressStart(50) }}
      >
        <Text>50문항</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderRadius: 10,
          height: 60,
          borderWidth: 1,
          marginVertical: 10,
          marginHorizontal: 5,
        }}
        onPress={() => { onPressStart(50) }}
      >
        <Text>100문항</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectQuestionsCountScreen;