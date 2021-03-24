import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const TestScreen = ({ route }) => {
  const [testItems, setTestItems] = useState([]);
  // const [engWods, setEngWords] = useState(shuffle(route.params.data.words).map(e => e.eng));
  // const [korWods, setKorWords] = useState(shuffle(route.params.data.words).map(e => e.kor));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const shuffleWords = shuffle();
    const shuffledEngWords = [...shuffleWords].map(e => e.eng);
    const shuffledKorWords = [...shuffleWords].map(e => e.kor);
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
    const shuffleArray = [];
    while (route.params.data.words.length > 0) {
      shuffleArray.push(route.params.data.words.splice(Math.floor(Math.random() * route.params.data.words.length), 1)[0]);
    }
    return shuffleArray;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {
          testItems[currentPage - 1]?.map(e => {
            return (
              <View
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
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>{e}</Text>
              </View>
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
          currentPage !== testItems.length &&
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
          </TouchableOpacity>
        }
      </View>
    </ScrollView>
  )
}

export default TestScreen;