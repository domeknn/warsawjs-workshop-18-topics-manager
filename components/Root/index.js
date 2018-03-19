import React from 'react'
import 'babel-polyfill'
import firebase from 'firebase'
import { compose, withStateHandlers, lifecycle, withProps } from 'recompose'
import { pipe, keys, map, reverse } from 'ramda'
import { observer, inject } from 'mobx-react'

import Nav from './../Nav'
import CreateWorkshop from './../CreateWorkshop'
import Workshops from './../Workshops'

const Root = ({ setUser, user, workshops }) => (
  <div className="container">
    <Nav setUser={setUser} user={user} />
    {user && <CreateWorkshop />}
    <Workshops workshops={workshops} />
  </div>
)

export default compose(
  inject('UserStore'),
  observer,
  withProps(({ UserStore: { user } }) => ({
    user,
  })),
  withStateHandlers(
    {
      workshops: null,
    },
    {
      setWorkshops: () => workshops => ({
        workshops,
      }),
    }
  ),
  lifecycle({
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.UserStore.setUser(user)
        } else {
          this.props.UserStore.setUser(null)
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
