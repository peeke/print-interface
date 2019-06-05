import React from 'react'
import { useSpring, animated } from 'react-spring'

import style from './Price.module.scss'

const formatPrice = amount => {
  const int = Math.floor(amount / 100)
  const decimal = (Math.floor(amount % 100) + '00').slice(0, 2)
  return [int, decimal].join('.')
}

export default function Price(props) {
  const { amount } = useSpring({
    amount: props.amount,
    config: { mass: 1, tension: 100, friction: 20, clamp: true }
  })

  return (
    <div className={style.price}>
      <span>{props.currency}&nbsp;</span>
      <animated.span>{amount.interpolate(formatPrice)}</animated.span>
    </div>
  )
}

Price.defaultProps = {
  amount: 0
}
