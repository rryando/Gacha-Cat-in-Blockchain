import React from "react"
import axios from "axios"
import GachaCard from "components/GachaCard"
import { Button } from "semantic-ui-react"
import { ModelGachaResult } from "models/ModelGacha"

const GachaPage = (props: any) => {
  const [isRotating, setIsRotating] = React.useState(false)
  const [isGachaButtonEnabled, setGachaButtonEnabled] = React.useState(true)
  const [gachaResult, setGachaResult] = React.useState<ModelGachaResult>()

  const fetchRandomCat = async () => {
    setGachaButtonEnabled(false)
    setIsRotating(false)
    setGachaResult(undefined)
    setIsRotating(true)
    setTimeout(async () => {
      const { data } = await axios.get(
        "https://api.thecatapi.com/v1/images/search?has_breeds=1&size=small"
      )
      const { breeds } = data[0]
      const catData = data[0]
      const catBreeds = breeds[0]
      const gachaCatData = {
        id: catData.id,
        imgUrl: catData.url,
        description: catBreeds?.description || "unknown",
        name: catBreeds?.name || "unknown",
        status: {
          Adaptability: catBreeds.adaptability || "unknown",
          "Affection Level": catBreeds.affection_level || "unknown",
          "Social Needs": catBreeds.social_needs || "unknown",
          "Stanger Friendly": catBreeds.stranger_friendly || "unknown",
          Rarity: catBreeds.rare || "unknown",
        },
      }

      setGachaResult(gachaCatData)
      setTimeout(() => {
        setIsRotating(false)
        setGachaButtonEnabled(true)
      }, 4000)
    }, 2000)
  }

  const saveCatToWallet = async () => {
    await props.token.methods
      .createCat(
        gachaResult!.id,
        gachaResult!.imgUrl,
        gachaResult!.description,
        gachaResult!.name
      )
      .send({ from: props.account })

    await props.refreshBlockchain()
  }

  return (
    <>
      <GachaCard isAnimated={isRotating} gachaResult={gachaResult} />
      <Button
        style={{ marginTop: "20px" }}
        onClick={() => fetchRandomCat()}
        disabled={!isGachaButtonEnabled}
      >
        Gacha
      </Button>
      <Button
        style={{ marginTop: "20px" }}
        onClick={() => saveCatToWallet()}
        disabled={!gachaResult}
      >
        Save Cat
      </Button>
    </>
  )
}

export default GachaPage
