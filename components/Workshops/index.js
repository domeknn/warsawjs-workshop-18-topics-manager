import React from 'react'
import { compose, defaultProps } from 'recompose'
import { map } from 'ramda'

import Workshop from './../Workshop'

const Workshops = ({ workshops }) => (
  <div className="columns">
    {workshops.length > 0 &&
      map(workshop => <Workshop key={workshop.id} workshop={workshop} />, workshops)}
  </div>
)

export default compose(
  defaultProps({
    workshops: [
      {
        id: 'workshop1',
        title: 'title',
        trainers: [
          { name: 'Trainer name1', img: '', id: 'id1' },
          { name: 'Trainer name2', img: '', id: 'id2' },
          { name: 'Trainer name3', img: '', id: 'id3' },
        ],
      },
      {
        id: 'workshop2',
        title: 'title2',
        trainers: [{ name: 'Trainer name3', img: '', id: 'id3' }],
      },
      {
        id: 'workshop3',
        title: 'title3',
        trainers: [
          { name: 'Trainer name1', img: '', id: 'id1' },
          { name: 'Trainer name2', img: '', id: 'id2' },
        ],
      },
    ],
  })
)(Workshops)
