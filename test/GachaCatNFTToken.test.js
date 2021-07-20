/* eslint-disable no-undef */
const GachaCatNFTToken = artifacts.require("./GachaCatNFTToken.sol")

require("chai").use(require("chai-as-promised")).should()

contract("Gacha Cat Token", accounts => {
  let token

  before(async function () {
    token = await GachaCatNFTToken.deployed()
  })

  describe("deployment", function () {
    it("deploys successfully", function () {
      const address = token.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, "")
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it("has a name", async function () {
      const name = await token.name()
      assert.equal(name, "Gacha Cat Token")
    })

    it("has a symbol", async function () {
      const symbol = await token.symbol()
      assert.equal(symbol, "GCAT")
    })
  })

  // describe("token distribution", function () {
  //   let result

  //   it("mints tokens", async function () {
  //     await token.mint(accounts[0], "https://www.token-uri.com/nft")

  //     // It should increase the total supply
  //     result = await token.totalSupply()
  //     assert.equal(result.toString(), "1", "total supply is correct")

  //     // It increments owner balance
  //     result = await token.balanceOf(accounts[0])
  //     assert.equal(result.toString(), "1", "balanceOf is correct")

  //     // Token should belong to owner
  //     result = await token.ownerOf("1")
  //     assert.equal(
  //       result.toString(),
  //       accounts[0].toString(),
  //       "ownerOf is correct"
  //     )
  //     result = await token.tokenOfOwnerByIndex(accounts[0], 0)

  //     // Owner can see all tokens
  //     let balanceOf = await token.balanceOf(accounts[0])
  //     let tokenIds = []
  //     for (let i = 0; i < balanceOf; i++) {
  //       let id = await token.tokenOfOwnerByIndex(accounts[0], i)
  //       tokenIds.push(id.toString())
  //     }
  //     let expected = ["1"]
  //     assert.equal(
  //       tokenIds.toString(),
  //       expected.toString(),
  //       "tokenIds are correct"
  //     )

  //     // Token URI Correct
  //     let tokenURI = await token.tokenURI("1")
  //     assert.equal(tokenURI, "https://www.token-uri.com/nft")
  //   })
  // })
})
