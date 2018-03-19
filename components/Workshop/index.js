import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { map, contains, length, keys } from 'ramda'
import { inject, observer } from 'mobx-react'
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
  inject('UserStore'),
  observer,
  withProps(({ UserStore: { user } }) => ({
    user,
  })),
  withProps(({ workshop: { trainers, likes }, user }) => ({
    trainers: trainers ? keys(trainers) : [],
    isLiked: user && likes && contains(user.uid, keys(likes)),
    isTrainer: user && trainers && contains(user.uid, keys(trainers)),
    likes: likes ? length(keys(likes)) : 0,
  })),
  withHandlers({
    add: ({ workshop: { id }, user }) => () => {
      user &&
        firebase
          .database()
          .ref(`workshops/${id}/trainers/${user.uid}`)
          .set({
            [user.uid]: user.uid,
          })
    },
    like: ({ workshop: { id }, user }) => () => {
      user &&
        firebase
          .database()
          .ref(`workshops/${id}/likes/${user.uid}`)
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
