import React from 'react'
import classNames from 'classnames'

import style from './Link.module.scss'

export default function Link(props) {
  const className = classNames(style.link, {
    [style.washed]: props.washed
  })

  return (
    <a href={props.to} className={className}>
      {props.children}
    </a>
  )
}
