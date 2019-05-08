import React from 'react'

import style from './PrintDetail.module.scss'

function PrintDetail(props) {
  return (
    <div className={style.template}>
      <div className={style.window}>{props.window}</div>
      <div className={style.body}>
        <div className={style.bodyTop}>{props.bodyTop}</div>
        <div className={style.bodyBottom}>{props.bodyBottom}</div>
        <div className={style.backButton}>{props.backButton}</div>
      </div>
    </div>
  )
}

export default PrintDetail
