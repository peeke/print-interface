import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'

import DisplayWindow from 'components/display-window/DisplayWindow'
import PrintDescription from 'components/containers/print-description/PrintDescription'

// Normally this would be loaded from a database or (headless) CMS
import print from 'assets/annie-spratt-695511-unsplash.jpg'

import style from './PrintDetail.module.scss'

const AnimatedDisplayWindow = animated(DisplayWindow)

export default function PrintDetailPage() {
  const [purchased, setPurchased] = useState(false)
  const [size, setSize] = useState('medium')
  const prices = {
    small: 3500,
    medium: 4550,
    large: 12000
  }

  const animatedProps = useSpring({
    value: Number(purchased),
    config: { mass: 6, tension: 200, friction: 50 }
  })
  const onPurchase = () => setPurchased(!purchased)

  return (
    <div className={style.wrapper}>
      <div className={style.window}>
        <AnimatedDisplayWindow
          progress={animatedProps.value}
          src={print}
          description="Light — 01 (A4)"
        />
      </div>
      <div className={style.body}>
        <PrintDescription
          size={size}
          price={prices[size]}
          onPurchase={onPurchase}
          onSizeChange={setSize}
        />
      </div>
    </div>
  )
}
