import React from 'react'

const Trainer = ({ trainer: { img, name } }) => (
  <article className="media box">
    <figure className="media-left">
      <p className="image is-64x64">
        <img alt="" src={img} />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>{name}</p>
      </div>
    </div>
    <div className="media-right">
      <button className="delete" />
    </div>
  </article>
)

export default Trainer
