import React, {useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native'

import {StartView} from './components/StartView'
import {WalkingView} from './components/WalkingView'
import {RoutesView} from './components/RoutesView'
import {RouteView} from './components/RouteView'

type data = {
  coordinates : any[],
  region : object,
  date : string
}

const App = () => {
  const [status, setStatus] = useState('startView');
  const [routes, setRoutes] = useState<data[]>([]);
  const [route, setRoute] = useState<data>();
  const startWalking = () => {
    setStatus('walkingView');
  }
  const stopWalking = (data : data) => {
    let newArray : data[] = [...routes, data]
    setRoutes(newArray);
    setStatus('startView');
  }

  const showRoutes = () => {
    setStatus('routesView');
  }

  const toStartView = () => {
    setStatus('startView');
  }

  const showRoute = (route : data) => {
    setRoute(route)
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
          <RoutesView showRoute={showRoute} routes={routes} toStartView={toStartView} />
        }
        {status == 'routeView' &&
          <RouteView  route={route} toStartView={toStartView} />
        }
    </View>
  );
};



export default App;
