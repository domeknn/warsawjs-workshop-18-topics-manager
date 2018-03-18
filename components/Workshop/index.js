import React from 'react'
import { compose, defaultProps } from 'recompose'
import { map } from 'ramda'
import Trainer from './../Trainer'

const Workshop = props => {
  const { workshop: { trainers, title } } = props
  return (
    <div className="column is-3">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">{title}</p>
          <div className="card-header-icon">
            <button className="delete" />
          </div>
        </div>
        <div className="card-content">
          {trainers.length > 0 &&
            map(trainer => <Trainer key={trainer.id} trainer={trainer} />, trainers)}
        </div>
        <div className="card-footer">
          <div className="card-footer-item">A</div>
          <div className="card-footer-item">B</div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  defaultProps({
    trainer: {
      name: 'Trainer name',
      img: 'https://bulma.io/images/placeholders/128x128.png',
    },
  })
)(Workshop)
