import React from 'react'
import classNames from 'classnames'

import style from './TextHeading.module.scss'

export default function TextHeading(props) {
  const H = 'h' + props.level
  return props.subtitle ? (
    <div className={style.heading}>
      <H className={style[H]}>{props.title}</H>
      <div className={style.subtitle}>{props.subtitle}</div>
    </div>
  ) : (
    <H className={classNames(style.heading, style[H])}>{props.title}</H>
  )
}
