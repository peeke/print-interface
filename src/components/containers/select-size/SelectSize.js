import React from 'react'

import SelectOption from 'components/select-option/SelectOption'

const availableSizes = [
  {
    label: 'small',
    value: '14.8 cm x 21.0 cm (A5)',
    alternativeValue: '5.8 in x 8.3 in'
  },
  {
    label: 'medium',
    value: '21.0 cm x 29.7 cm (A4)',
    alternativeValue: '8.3 in x 11.7 in'
  },
  {
    label: 'large',
    value: '29.7 cm x 42.0 cm (A3)',
    alternativeValue: '11.7 in x 16.5 in'
  }
]

export default function SelectSize(props) {
  const labels = availableSizes.map(props => props.label)

  return (
    <SelectOption
      labels={labels}
      selected={props.selected}
      onChange={props.onChange}
    >
      {availableSizes.map(SelectSizeOption)}
    </SelectOption>
  )
}

function SelectSizeOption(props, i) {
  return (
    <div key={i}>
      <strong>{props.value}</strong>
      <span>{props.alternativeValue}</span>
    </div>
  )
}
