import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';

const SelectQuestionsCountScreen = ({ route, navigation }) => {
  const [usingSimul, setUsingSimul] = useState(false);
  useEffect(() => {
  })
  const onPressStart = (count) => {
    if (count > route.params.data.words.length) {
      Alert.alert('문항수가 부족해요. 문제를 더 추가해줘요..;');
      return;
    }
    navigation.push('TestScreen', {
      data: route.params.data,
      count,
      selected: route.params.selected,
      usingSimul: usingSimul,
    });
  }

  const onPressUsingSimul = () => {
    setUsingSimul(!usingSimul);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', marginBottom: 100, paddingHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
          onPress={() => { onPressStart(100) }}
        >
          <Text>100문항</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', marginLeft: 10 }}>
        <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} onPress={onPressUsingSimul}>
          {usingSimul && <Image source={require('../../images/ClipartKey_187542.png')} style={{ width: 25, height: 25, marginLeft: 10, marginBottom: 10 }} />}
        </TouchableOpacity>
        <Text style={{ marginLeft: 8 }}>저는 시뮬레이터를 사용하고 있어요.</Text>
      </View>
    </View>
  )
}

export default SelectQuestionsCountScreen;