import React from 'react'

import style from './PrintDetail.module.scss'

function PrintDetail(props) {
  return <div className={style.template}>{props.children}</div>
}

function PrintDetailWindow(props) {
  return <div className={style.window}>{props.children}</div>
}

function PrintDetailBody(props) {
  return <div className={style.body}>{props.children}</div>
}

PrintDetail.Window = PrintDetailWindow
PrintDetail.Body = PrintDetailBody

export default PrintDetail
