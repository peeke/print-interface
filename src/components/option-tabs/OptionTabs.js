import React, { Children } from 'react'
import { useTransition, animated } from 'react-spring'

import style from './OptionTabs.module.scss'

export default function OptionTabs(props) {
  const renderLabel = label => (
    <OptionTabLabel
      key={label}
      onClick={() => props.onChange(label)}
      pressed={props.value === label}
    >
      {label}
    </OptionTabLabel>
  )

  const renderTab = (child, index) => (
    <OptionTab key={index} visible={props.labels[index] === props.value}>
      {child}
    </OptionTab>
  )

  return (
    <div className={style.wrapper}>
      <div className={style.labels}>{props.labels.map(renderLabel)}</div>
      <div className={style.tabs}>
        {Children.map(props.children, renderTab)}
      </div>
    </div>
  )
}

function OptionTabLabel(props) {
  return (
    <button
      className={style.label}
      onClick={props.onClick}
      aria-pressed={props.pressed}
    >
      {props.children}
    </button>
  )
}

function OptionTab(props) {
  const transitions = useTransition(props.visible, null, {
    from: {
      transform: 'translate3d(0,-1em,0)',
      opacity: 0
    },
    enter: {
      transform: 'translate3d(0,0,0)',
      opacity: 1,
      trail: 200
    },
    leave: {
      position: 'absolute',
      top: 0,
      transform: 'translate3d(0,1em,0)',
      opacity: 0
    }
  })

  return transitions
    .filter(({ item }) => item)
    .map(({ props: animatedProps, key }) => (
      <animated.div key={key} style={animatedProps}>
        {props.children}
      </animated.div>
    ))
}
