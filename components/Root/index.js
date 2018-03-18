import React from 'react'
import 'babel-polyfill'
import firebase from 'firebase'
import Nav from './../Nav'
import CreateWorkshop from './../CreateWorkshop'
import Workshops from './../Workshops'

const config = {
  apiKey: 'AIzaSyA8Ca6VP_uoFhP89fjtACgqxOe85jkTH3I',
  authDomain: 'warsawjs-workshop-18.firebaseapp.com',
  databaseURL: 'https://warsawjs-workshop-18.firebaseio.com',
  projectId: 'warsawjs-workshop-18',
  storageBucket: 'warsawjs-workshop-18.appspot.com',
  messagingSenderId: '197910791795',
}
firebase.initializeApp(config)

const Root = () => (
  <div className="container">
    <Nav />
    <CreateWorkshop />
    <Workshops />
  </div>
)

export default Root
