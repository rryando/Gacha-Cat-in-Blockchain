export type ModelGachaResult = {
  id: string
  imgUrl: string
  description: string
  name: string
  status?: {
    Adaptability: string
    "Affection Level": string
    "Social Needs": string
    "Stanger Friendly": string
    Rarity: string
  }
  tipAmount?: number
  owner?: string
}
