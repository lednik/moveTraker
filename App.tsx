import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native'
import {StartView} from './src/components/pages/StartView'
import {WalkingView} from './src/components/pages/WalkingView'
import {RoutesView} from './src/components/pages/RoutesView'
import {RouteView} from './src/components/pages/RouteView'

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
const styles = StyleSheet.create({
  scrollView: {
      backgroundColor: '#c5bbba',
  },
  view: {
    flex: 1,
    backgroundColor: '#EBF9F8',
  },
  text: {
      fontSize: 32,
      marginBottom: 24
  }
})
export default App;
