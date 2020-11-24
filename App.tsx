import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'

import {StartView} from './components/StartView'
import {WalkingView} from './components/WalkingView'
import {RoutesView} from './components/RoutesView'
import {RouteView} from './components/RouteView'

const App = () => {
  const [status, setStatus] = useState('startView');
  const [route, setRoute] = useState<string>('');

  const startWalking = () => {
    setStatus('walkingView');
  }
  
  const stopWalking = () => {
    setStatus('startView');
  }

  const showRoutes = () => {
    setStatus('routesView');
  }

  const toStartView = () => {
    setStatus('startView');
  }

  const showRoute = (value : string) => {
    setRoute(value);
    setStatus('routeView');
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
          <StartView startWalking={startWalking} showRoutes={showRoutes} />
        }
        {
          status == 'walkingView' &&
          <WalkingView stopWalking={stopWalking} />
        }
        {status == 'routesView' &&
          <RoutesView showRoute={showRoute} toStartView={toStartView} />
        }
        {status == 'routeView' &&
          <RouteView  route={route} toStartView={toStartView} />
        }
    </View>
  );
};

export default App;
