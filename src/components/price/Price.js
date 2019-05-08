import React from 'react'

import style from './Price.module.scss'

const formatDecimal = number => (number + '00').slice(0, 2)

const getPriceComponents = amount => [
  Math.floor(amount / 100),
  formatDecimal(amount % 100)
]

export default function Price(props) {
  const [int, decimal] = getPriceComponents(props.amount)
  return (
    <div className={style.price}>
      {props.currency} {int}.{decimal}
    </div>
  )
}
