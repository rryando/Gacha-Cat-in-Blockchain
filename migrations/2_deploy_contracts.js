/* eslint-disable no-undef */
const GachaCatNFTToken = artifacts.require("GachaCatNFTToken")
const CatCollectionToken = artifacts.require("CatCollectionToken")

module.exports = async function (deployer) {
  await deployer.deploy(GachaCatNFTToken)
  await deployer.deploy(CatCollectionToken)
}
