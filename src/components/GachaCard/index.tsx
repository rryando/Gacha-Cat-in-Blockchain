import React from "react"
import LogoNoiru from "logo-noiru-2.svg"
import { Card, Image } from "semantic-ui-react"
import { ModelGachaResult } from "models/ModelGacha"

type Props = {
  isAnimated: boolean
  gachaResult?: ModelGachaResult | undefined
}

const GachaCard = (props: Props) => {
  const { isAnimated, gachaResult } = props
  console.log(gachaResult)
  return (
    <div
      className={
        isAnimated ? `animate-rotate card-container` : `card-container`
      }
    >
      <Card className={"gacha-card"}>
        <Card.Content className={"gacha-card-content"}>
          <div className={"gacha-card-image-wrapper"}>
            {gachaResult ? (
              <>
                <Image
                  src={gachaResult.imgUrl}
                  className={"gacha-card-image-result"}
                />
              </>
            ) : (
              <>
                <div className={"gacha-card-animate-logo"} />
                <Image src={LogoNoiru} className={"gacha-card-image-content"} />
              </>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default GachaCard
