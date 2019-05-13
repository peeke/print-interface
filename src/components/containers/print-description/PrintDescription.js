import React from 'react'

import TextHeading from 'components/text/TextHeading'
import TextBody from 'components/text/TextBody'
import Price from 'components/price/Price'
import Link from 'components/link/Link'
import Button from 'components/button/Button'
import SelectSize from 'components/containers/select-size/SelectSize'

import style from './PrintDescription.module.scss'

export default function PrintDescription(props) {
  return (
    <div className={style.printDescription}>
      <div className={style.description}>
        <TextHeading
          level={1}
          title="Abstract Background (A4)"
          subtitle="Giclée Print"
        />
        <TextBody>
          Price does not include shipping costs. Printed on high-quality
          Hahnemühle Photo Rag fine art paper (308 gsm).
        </TextBody>
      </div>
      <div className={style.specification}>
        <SelectSize selected={props.size} onChange={props.onSizeChange} />
        <Price amount={3500} currency="£" />
      </div>
      <div className={style.purchase}>
        <Button type="primary" onClick={props.onPurchase}>
          Purchase
        </Button>
      </div>
      <div className={style.backButton}>
        <Link to="/" washed>
          Back
        </Link>
      </div>
    </div>
  )
}
