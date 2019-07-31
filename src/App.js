import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'
import AppContainer from './pages/ScreeenManager'
import Loader from './components/Loader'

const { store, persistor } = configureStore()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReduxLoaded: true
    }
  }

  componentWillMount() {
    console.log('componentWillMount')    
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    const { isReduxLoaded } = this.state
    return isReduxLoaded ? (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    ) : (
      <Loader animating={!isReduxLoaded} color={'black'} />
    )
  }
}
