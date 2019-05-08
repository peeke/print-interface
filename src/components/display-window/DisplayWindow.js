import React from 'react'

import style from './DisplayWindow.module.scss'

export default function DisplayWindow(props) {
  return <img className={style.image} src={props.src} alt={props.description} />
}
