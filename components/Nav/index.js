import React, { Fragment } from 'react'
import firebase from 'firebase'
import { compose, withStateHandlers, withHandlers } from 'recompose'

const Nav = ({ isLogged, logIn, logOut, user, isLoading }) => (
  <div className="nav">
    <h1 className="title">Project</h1>
    <div className="flex">
      {isLogged ? (
        <Fragment>
          <p className="mr-10">Hello, {user.username}</p>
          <button onClick={logOut} className="button is-danger">
            Logout
          </button>
        </Fragment>
      ) : (
        <button onClick={logIn} className={`button is-primary ${isLoading ? 'is-loading' : ''}`}>
          Login
        </button>
      )}
    </div>
  </div>
)

export default compose(
  withStateHandlers(
    {
      isLogged: false,
      isLoading: false,
      user: {},
    },
    {
      logIn: () => user => ({
        user,
        isLogged: true,
        isLoading: false,
      }),
      logOut: () => () => ({
        isLogged: false,
      }),
      setLoading: () => () => ({
        isLoading: true,
      }),
    }
  ),
  withHandlers({
    logIn: ({ logIn, setLoading }) => async () => {
      const provider = new firebase.auth.GithubAuthProvider()
      setLoading(true)
      const result = await firebase.auth().signInWithPopup(provider)
      logIn(result.additionalUserInfo)
    },
  })
)(Nav)
