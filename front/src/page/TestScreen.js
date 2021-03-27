import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const TestScreen = ({ route, navigation }) => {
  const [testItems, setTestItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notKnowList, setNotKnowList] = useState([]);

  useEffect(() => {
    const shuffledEngWords = shuffle().map(e => { return { word: e.eng, answer: e.kor } });
    const shuffledKorWords = shuffle().map(e => { return { word: e.kor, answer: e.eng } });
    const shuffledWords = [];
    const copyShuffledEngWords = [...shuffledEngWords];
    const copyShuffledKorWords = [...shuffledKorWords];
    for (let index = 0; index < Math.ceil(shuffledEngWords.length / 10); index++) {
      shuffledWords.push(copyShuffledEngWords.splice(0, 10));
      shuffledWords.push(copyShuffledKorWords.splice(0, 10));
    }
    setTestItems(shuffledWords);
  }, []);

  const shuffle = () => {
    const propWords = [...route.params.data.words];
    const shuffleArray = [];
    while (propWords.length > 0) {
      shuffleArray.push(propWords.splice(Math.floor(Math.random() * propWords.length), 1)[0]);
    }
    return shuffleArray;
  }

  const testComplete = async () => {
    const AsyncAlert = async () => new Promise((resolve, reject) => {
      Alert.alert(
        '알림',
        '테스트 종료할래요?',
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
      const passValue = testItems.map(e => {
        return e.map(e2 => {
          if (notKnowList.includes(e2.word)) {
            return { word: e2.word, notKnow: true, answer: e2.answer };
          }
          return { word: e2.word, answer: e2.answer };
        });
      });
      navigation.push('TestCompleteScreen', {
        words: passValue,
      })
    }
  }

  const onPressWordButton = (e) => {
    const copyNotKnowList = [...notKnowList];
    if (copyNotKnowList.find(item => item === e.word)) {
      const findIndex = copyNotKnowList.findIndex(item => item === e);
      copyNotKnowList.splice(findIndex, 1);
    } else {
      copyNotKnowList.push(e.word);
    }
    console.log('hi', copyNotKnowList);
    setNotKnowList(copyNotKnowList);
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {
          testItems[currentPage - 1]?.map((e, i) => {
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
                  height: 60,
                  borderWidth: 1,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  backgroundColor: notKnowList.find(item => item === e.word) ? 'yellow' : '#ffffff',
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>{e.word}</Text>
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
          currentPage !== testItems.length ?
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
              <Text>완료</Text>
            </TouchableOpacity>
        }
      </View>
    </ScrollView>
  )
}

export default TestScreen;