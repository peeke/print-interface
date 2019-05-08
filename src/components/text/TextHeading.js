import React from 'react'

export default function TextHeading(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <div>{props.subtitle}</div>}
    </div>
  )
}
