import React, { Fragment } from 'react'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import firebase from 'firebase'

const Nav = ({ login, logout, user, isLoading }) => (
  <div className="nav">
    <h1 className="title">Project</h1>
    <div className="flex">
      {user ? (
        <Fragment>
          <p className="mr-10">Hello, {user.displayName}</p>
          <button onClick={logout} className="button is-danger">
            Logout
          </button>
        </Fragment>
      ) : (
        <button onClick={login} className={`button is-primary ${isLoading ? 'is-loading' : ''}`}>
          Login
        </button>
      )}
    </div>
  </div>
)

export default compose(
  withStateHandlers(
    {
      isLoading: false,
    },
    {
      setLoading: () => isLoading => ({
        isLoading,
      }),
    }
  ),
  withHandlers({
    login: ({ setLoading }) => async () => {
      const provider = new firebase.auth.GithubAuthProvider()
      setLoading(true)
      const result = await firebase.auth().signInWithPopup(provider)

      firebase
        .database()
        .ref(`users`)
        .set({
          [result.user.uid]: result.additionalUserInfo.profile,
        })
      setLoading(false)
    },
    logout: () => () => {
      firebase.auth().signOut()
    },
  })
)(Nav)
