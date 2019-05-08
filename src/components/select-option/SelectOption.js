import React, { PureComponent } from 'react'

import style from './SelectOption.module.scss'

export default class SelectOption extends PureComponent {
  static defaultProps = {
    selected: 0,
    onChange: () => {}
  }

  onClick(index, event) {
    event.preventDefault()
    this.props.onChange(index)
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.labels}>
          {this.props.labels.map(this.renderLabel)}
        </div>
        {this.props.children[this.props.selected]}
      </div>
    )
  }

  renderLabel = (label, i) => {
    return (
      <button
        key={i}
        className={style.label}
        onClick={this.onClick.bind(this, i)}
        aria-pressed={this.props.selected === i}
      >
        {label}
      </button>
    )
  }
}
