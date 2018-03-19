import React, { Fragment } from 'react'
import firebase from 'firebase'
import { compose, withStateHandlers, lifecycle, withHandlers, withProps } from 'recompose'
import { inject, observer } from 'mobx-react'

const Trainer = ({ user, remove, currentUser, trainer }) => (
  <article className="media box">
    {user && (
      <Fragment>
        <figure className="media-left">
          <p className="image is-64x64">
            <img alt="" src={user.avatar_url} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>{user.name}</p>
          </div>
        </div>
        <div className="media-right">
          {currentUser &&
            currentUser.uid === trainer && <button onClick={remove} className="delete" />}
        </div>
      </Fragment>
    )}
  </article>
)

export default compose(
  inject('UserStore'),
  observer,
  withProps(({ UserStore: { user } }) => ({
    currentUser: user,
  })),
  withStateHandlers(
    {
      user: null,
    },
    {
      setUser: () => user => ({
        user: user || null,
      }),
    }
  ),
  lifecycle({
    componentDidMount() {
      firebase
        .database()
        .ref(`users/${this.props.trainer}`)
        .once('value')
        .then(user => {
          this.props.setUser(user.val())
        })
    },
  }),
  withHandlers({
    remove: ({ workshop, currentUser }) => () => {
      currentUser &&
        firebase
          .database()
          .ref(`workshops/${workshop}/trainers/${currentUser.uid}`)
          .remove()
    },
  })
)(Trainer)
