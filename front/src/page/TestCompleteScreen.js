import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Alert } from 'react-native';

const TestCompleteScreen = ({ route, navigation }) => {
  const [words, setWords] = useState(route.params.words);
  const [currentPage, setCurrentPage] = useState(1);
  const [notKnowList, setNotKnowList] = useState([]);
  useEffect(() => {
  })

  const testComplete = async () => {
    const AsyncAlert = async () => new Promise((resolve, reject) => {
      Alert.alert(
        '알림',
        '메인페이지로 이동할래용?',
        [{
          text: '아 잠만요', onPress: () => {
            resolve(false);
          },
        }, {
          text: '예!', onPress: () => {
            resolve(true)
          },
        }],
      );
    });
    if (await AsyncAlert()) {
      navigation.popToTop();
    }
  }
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {
          words[currentPage - 1]?.map((e, i) => {
            return (
              <TouchableOpacity
                onPress={() => onPressWordButton(e)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'black',
                  borderRadius: 10,
                  minWidth: 150,
                  maxWidth: 150,
                  minHeight: 60,
                  borderWidth: 1,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  // backgroundColor: e.notKnow ? 'yellow' : '#ffffff',
                  backgroundColor: e.notKnow ? 'yellow' : e.isRight ? 'blue' : '#ffffff',
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>{e.word}</Text>
                <Text style={{ fontWeight: 'bold', color: 'red' }}>{e.answer}</Text>
                <Text style={{ fontWeight: 'bold', color: 'blue' }}>{e.myAnswer}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View style={{}}>
        {
          currentPage > 1 &&
          <TouchableOpacity
            style={{
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
              position: 'absolute',
              bottom: 0,
            }}
            onPress={() => { setCurrentPage(currentPage - 1) }}
          >
            <Text>이전 페이지</Text>
          </TouchableOpacity>
        }
        {
          currentPage !== words.length ?
            <TouchableOpacity
              style={{
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
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
              onPress={() => { setCurrentPage(currentPage + 1) }}
            >
              <Text>다음 페이지</Text>
            </TouchableOpacity> :
            <TouchableOpacity
              style={{
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
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
              onPress={testComplete}
            >
              <Text>메인페이지로</Text>
            </TouchableOpacity>
        }
      </View>
    </ScrollView>
    // <ScrollView>
    //   <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
    //     {
    //       words.map((e, i) => (
    //         <TouchableOpacity
    //           key={e + i}
    //           style={{
    //             flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderColor: 'black',
    //             borderRadius: 10,
    //             minWidth: 150,
    //             maxWidth: 150,
    //             height: 60,
    //             borderWidth: 1,
    //             marginVertical: 10,
    //             marginHorizontal: 5,
    //             backgroundColor: e.notKnow ? 'yellow' : '#ffffff',
    //           }}
    //         >
    //           <Text >{e.word}</Text>
    //           <Text >{e.answer}</Text>
    //         </TouchableOpacity>
    //       ))
    //     }
    //   </View>
    // </ScrollView>
  )
}

export default TestCompleteScreen;