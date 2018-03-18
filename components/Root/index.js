import React from 'react'
import 'babel-polyfill'
import firebase from 'firebase'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { pipe, keys, map, reverse } from 'ramda'

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

const Root = ({ setUser, user, workshops }) => (
  <div className="container">
    <Nav setUser={setUser} user={user} />
    {user && <CreateWorkshop />}
    <Workshops workshops={workshops} />
  </div>
)

export default compose(
  withStateHandlers(
    {
      user: null,
      workshops: null,
    },
    {
      setUser: () => user => ({
        user,
      }),
      setWorkshops: () => workshops => ({
        workshops,
      }),
    }
  ),
  lifecycle({
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.setUser(user)
        } else {
          this.props.setUser(null)
        }
      })
      const workshops = firebase.database().ref(`workshops`)
      workshops.on('value', snapshot => {
        const values = snapshot.val()
        this.props.setWorkshops(pipe(keys, map(id => ({ ...values[id], id })), reverse)(values))
      })
    },
  })
)(Root)
