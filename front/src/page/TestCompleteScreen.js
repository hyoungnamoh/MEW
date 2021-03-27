import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';

const TestCompleteScreen = ({ route, navigation }) => {
  const [words, setWords] = useState(route.params.words);
  useEffect(() => {
  })
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {
          words.map((e, i) => (
            <TouchableOpacity
              key={e + i}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderRadius: 10,
                minWidth: 150,
                maxWidth: 150,
                height: 60,
                borderWidth: 1,
                marginVertical: 10,
                marginHorizontal: 5,
                backgroundColor: e.notKnow ? 'yellow' : '#ffffff',
              }}
            >
              <Text >{e.word}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default TestCompleteScreen;