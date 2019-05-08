import React from 'react'

import PrintDetail from 'templates/print-detail/PrintDetail'

import DisplayWindow from 'components/display-window/DisplayWindow'
import TextHeading from 'components/text/TextHeading'
import TextBody from 'components/text/TextBody'
import Price from 'components/price/Price'
import Link from 'components/link/Link'
import Button from 'components/button/Button'
import SelectSize from 'components/containers/select-size/SelectSize'

// Normally this would be loaded from a database or (headless) CMS
import print from 'assets/annie-spratt-695511-unsplash.jpg'

export default function Page() {
  return (
    <PrintDetail
      window={PrintDetailWindow()}
      description={PrintDetailDescription()}
      specification={PrintDetailSpecification()}
      purchase={PrintDetailPurchase()}
      backButton={
        <Link to="/" washed>
          Back
        </Link>
      }
    />
  )
}

function PrintDetailWindow() {
  return <DisplayWindow src={print} description="Light — 01 (A4)" />
}

function PrintDetailDescription() {
  return (
    <>
      <TextHeading
        level={1}
        title="Abstract Background (A4)"
        subtitle="Giclée Print"
      />
      <TextBody>
        Price does not include shipping costs. Printed on high-quality
        Hahnemühle Photo Rag fine art paper (308 gsm).
      </TextBody>
    </>
  )
}

function PrintDetailSpecification() {
  return (
    <>
      <SelectSize selected={1} />
      <Price amount={3500} currency="£" />
    </>
  )
}

function PrintDetailPurchase() {
  return <Button type="primary">Purchase</Button>
}
