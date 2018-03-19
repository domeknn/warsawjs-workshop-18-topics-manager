import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { Provider } from 'mobx-react'

import Root from './components/Root/index.js'
import UserStore from './store/UserStore.js'

const stores = {
  UserStore,
}

const config = {
  apiKey: 'AIzaSyA8Ca6VP_uoFhP89fjtACgqxOe85jkTH3I',
  authDomain: 'warsawjs-workshop-18.firebaseapp.com',
  databaseURL: 'https://warsawjs-workshop-18.firebaseio.com',
  projectId: 'warsawjs-workshop-18',
  storageBucket: 'warsawjs-workshop-18.appspot.com',
  messagingSenderId: '197910791795',
}
firebase.initializeApp(config)

const Start = () => (
  <Provider {...stores}>
    <Root />
  </Provider>
)

ReactDOM.render(<Start />, document.getElementById('app'))
