import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SkimmingWordButton = ({ item }) => {
  const [skimmed, setSkimmed] = useState(false);

  const onPressWordButton = () => {
    setSkimmed(true);
  }

  return (
    <TouchableOpacity
      onPress={() => onPressWordButton()}
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
        backgroundColor: item.notKnow ? 'yellow' : item.isRight ? 'blue' : '#ffffff',
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>{item.word}</Text>
      {skimmed && <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.answer}</Text>}
    </TouchableOpacity>
  )
}

export default SkimmingWordButton;