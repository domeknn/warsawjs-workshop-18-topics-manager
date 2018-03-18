import React from 'react'
import { compose, withHandlers, withProps, withStateHandlers, lifecycle } from 'recompose'
import { map, contains, length } from 'ramda'
import firebase from 'firebase'

import Trainer from './../Trainer'

const Workshop = props => {
  const {
    workshop: { title, _owner, id: workshopId },
    trainers,
    user,
    add,
    like,
    unlike,
    likes,
    isLiked,
    isTrainer,
    remove,
  } = props

  return (
    <div className="column is-3">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">{title}</p>
          <div className="card-header-icon">
            {user && user.uid === _owner && <button onClick={remove} className="delete" />}
          </div>
        </div>

        <div className="card-content">
          {map(
            trainer => <Trainer key={trainer} workshop={workshopId} trainer={trainer} />,
            trainers
          )}
        </div>
        <div className="card-footer">
          <div className="card-footer-item">Likes: {likes}</div>
        </div>
        {user && (
          <div className="card-footer">
            <div onClick={isLiked ? unlike : like} className="card-footer-item">
              {isLiked ? 'Unlike' : 'Like'}
            </div>
            {!isTrainer && (
              <div onClick={add} className="card-footer-item">
                +
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default compose(
  withStateHandlers(
    {
      user: null,
    },
    {
      setUser: () => user => ({
        user,
      }),
    }
  ),
  lifecycle({
    componentDidMount() {
      this.subscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.setUser(user)
        } else {
          this.props.setUser(null)
        }
      })
    },
    componentWillUnmount() {
      this.subscribe()
    },
  }),
  withProps(({ workshop: { trainers, likes }, user }) => ({
    trainers: trainers ? Object.keys(trainers) : [],
    isLiked: user && likes ? contains(user.uid, Object.keys(likes)) : false,
    isTrainer: user && trainers ? contains(user.uid, Object.keys(trainers)) : false,
    likes: likes ? length(Object.keys(likes)) : 0,
  })),
  withHandlers({
    add: ({ workshop: { id }, user }) => () => {
      user &&
        firebase
          .database()
          .ref(`workshops/${id}/trainers`)
          .set({
            [user.uid]: user.uid,
          })
    },
    like: ({ workshop: { id }, user }) => () => {
      user &&
        firebase
          .database()
          .ref(`workshops/${id}/likes`)
          .set({
            [user.uid]: user.uid,
          })
    },
    unlike: ({ workshop, user }) => () => {
      user &&
        firebase
          .database()
          .ref(`workshops/${workshop.id}/likes/${user.uid}`)
          .remove()
    },
    remove: ({ workshop }) => () => {
      firebase
        .database()
        .ref(`workshops/${workshop.id}`)
        .remove()
    },
  })
)(Workshop)
