import React from 'react'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import firebase from 'firebase'
import { inject, observer } from 'mobx-react'

const CreateWorkshop = ({ value, setValue, create }) => (
  <form onSubmit={create} className="search field has-addons">
    <div className="control is-expanded">
      <input className="input"
        type="text"
        placeholder="Enter text..."
        onChange={setValue}
        value={value} />
    </div>
    <div className="control">
      <button type="submit" onClick={create} className="button is-info">
        Create
      </button>
    </div>
  </form>
)

export default compose(
  inject('UserStore'),
  observer,
  withStateHandlers(
    {
      value: '',
    },
    {
      setValue: () => e => ({
        value: e.target.value,
      }),
      resetValue: () => () => ({
        value: '',
      }),
    }
  ),
  withHandlers({
    create: ({ value, resetValue, UserStore: { user } }) => e => {
      e.preventDefault()

      const key =
        user &&
        value.length > 0 &&
        firebase
          .database()
          .ref(`workshops`)
          .push({
            title: value,
            trainers: {},
            _owner: user.uid,
          })

      key && resetValue()
    },
  })
)(CreateWorkshop)
