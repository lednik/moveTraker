import React, {useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native'

import {StartView} from './components/StartView'
import {WalkingView} from './components/WalkingView'

const App = () => {
  const [status, setStatus] = useState('startView');
  const startWalking = () => {
    setStatus('walkingView');
  }
  const stopWalking = () => {
    setStatus('startView');
  }
  const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#c5bbba',
    },
    view: {
      flex: 1,
      backgroundColor: '#c5bbba',
    },
    text: {
        fontSize: 32,
        marginBottom: 24
    }
  })
  return (
    <View style={styles.view}>
        {status == 'startView' &&
          <StartView startWalking={startWalking} />
        }
        {
          status == 'walkingView' &&
          <WalkingView stopWalking={stopWalking} />
        }
    </View>
  );
};



export default App;
