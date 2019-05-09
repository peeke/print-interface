import React, { PureComponent } from 'react'

import ThreeDisplayWindow from './ThreeDisplayWindow'

import style from './DisplayWindow.module.scss'

export default class DisplayWindow extends PureComponent {
  canvas = React.createRef()

  render() {
    return <canvas ref={this.canvas} className={style.canvas} />
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.threeDisplayWindow.setSrc(this.props.src)
    }
  }

  componentDidMount() {
    this.threeDisplayWindow = new ThreeDisplayWindow(
      this.canvas.current,
      this.props.src
    )
  }
}
