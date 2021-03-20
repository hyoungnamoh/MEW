import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const shuffle = (array) => {
  let j, x, i;
  for (i = array.length; i; i -= 1) {
    j = Math.floor(Math.random() * i); x = array[i - 1];
    array[i - 1] = array[j];
    array[j] = x;
  }
  return array;
}

const TestScreen = ({ route }) => {
  const [testItems, setTestItems] = useState([]);
  const [engWods, setEngWords] = useState(shuffle(route.params.data.words).map(e => e.eng));
  const [korWods, setKorWords] = useState(shuffle(route.params.data.words).map(e => e.kor));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const shuffledEngWords = shuffle(route.params.data.words).map(e => e.eng);
    const shuffledKorWords = shuffle(route.params.data.words).map(e => e.kor);
    const shuffledWords = [];
    for (let index = 0; index < Math.ceil(shuffledEngWords.length / 10); index++) {
      const copyShuffledEngWords = [...shuffledEngWords];
      const copyShuffledKorWords = [...shuffledKorWords];
      shuffledWords.push(copyShuffledEngWords.splice(index, 10));
      shuffledWords.push(copyShuffledKorWords.splice(index, 10));
    }
    // shuffledEngWords.map((e, i) => {
    //   const copyShuffledEngWords = [...shuffledEngWords];
    //   const copyShuffledKorWords = [...shuffledKorWords];
    //   shuffledWords.push(copyShuffledEngWords.splice());
    //   shuffledWords.push(shuffledKorWords[i]);
    // })
    setTestItems(shuffledWords);
    console.log(shuffledWords);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'blue' }} contentContainerStyle={{ flex: 1 }}>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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