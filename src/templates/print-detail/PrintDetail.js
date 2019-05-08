import React from 'react'

import style from './PrintDetail.module.scss'

function PrintDetail(props) {
  return (
    <div className={style.template}>
      <div className={style.window}>{props.window}</div>
      <form className={style.body}>
        <div className={style.description}>{props.description}</div>
        <div className={style.specification}>{props.specification}</div>
        <div className={style.purchase}>{props.purchase}</div>
        <div className={style.backButton}>{props.backButton}</div>
      </form>
    </div>
  )
}

export default PrintDetail
