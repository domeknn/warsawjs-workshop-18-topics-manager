import React from 'react'
import { map } from 'ramda'

import Workshop from './../Workshop'

const Workshops = ({ workshops }) => (
  <div className="columns is-multiline">
    {workshops && map(workshop => <Workshop key={workshop.id} workshop={workshop} />, workshops)}
  </div>
)

export default Workshops
