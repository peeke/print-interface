import React from 'react'

import style from './TextBody.module.scss'

export default function TextBody(props) {
  return <div className={style.body}>{props.children}</div>
}
