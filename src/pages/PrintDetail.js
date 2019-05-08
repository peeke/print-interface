import React from 'react'

import PrintDetail from 'templates/print-detail/PrintDetail'

import DisplayWindow from 'components/display-window/DisplayWindow'
import TextHeading from 'components/text/TextHeading'
import TextBody from 'components/text/TextBody'
import Price from 'components/price/Price'
import Link from 'components/link/Link'
import Button from 'components/button/Button'

// Normally this would be loaded from a database or (headless) CMS
import print from 'assets/annie-spratt-695511-unsplash.jpg'

function App() {
  return (
    <PrintDetail>
      <PrintDetail.Window>
        <DisplayWindow src={print} description="Light — 01 (A4)" />
      </PrintDetail.Window>
      <PrintDetail.Body>
        <TextHeading
          level={1}
          title="Light — 01 (A4)"
          subtitle="Giclée Print"
        />
        <TextBody>
          Price does not include shipping costs. Printed on high-quality
          Hahnemühle Photo Rag fine art paper (308 gsm).
        </TextBody>
        <Price amount={3500} currency="pound" />
        <Button type="primary">Purchase</Button>
        <Link to="/">Back</Link>
      </PrintDetail.Body>
    </PrintDetail>
  )
}

export default App
