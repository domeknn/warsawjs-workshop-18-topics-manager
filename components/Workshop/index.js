import React from 'react'
import Trainer from './../Trainer'

const Workshop = () => (
  <div className="column is-3">
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Title</p>
        <div className="card-header-icon">
          <button className="delete" />
        </div>
      </div>
      <div className="card-content">
        <Trainer />
      </div>
      <div className="card-footer">
        <div className="card-footer-item">A</div>
        <div className="card-footer-item">B</div>
      </div>
    </div>
  </div>
)

export default Workshop
