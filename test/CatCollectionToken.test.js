/* eslint-disable no-undef */
const CatCollectionToken = artifacts.require("./CatCollectionToken.sol")

require("chai").use(require("chai-as-promised")).should()

contract("Gacha Cat Collection", ([deployer, author, tipper]) => {
  let token

  before(async function () {
    token = await CatCollectionToken.deployed()
  })

  describe("deployment", function () {
    it("deploys successfully", async function () {
      const address = await token.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, "")
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it("has a name", async function () {
      const name = await token.name()
      assert.equal(name, "Gacha Cat Collection")
    })
  })

  describe("posts", function () {
    let result, issuedCat

    before(async function () {
      result = await token.createCat(
        "someid",
        "https://cdn2.thecatapi.com/images/v63sbirkC.jpg",
        "somecat",
        "catname",
        {
          from: author,
        }
      )
      issuedCat = await token.issuedCat()
    })

    it("create cat", async function () {
      // SUCESS
      assert.equal(issuedCat, 1)
      const event = result.logs[0].args
      assert.equal(event.id, "someid", "id is correct")
      assert.equal(
        event.imgUrl,
        "https://cdn2.thecatapi.com/images/v63sbirkC.jpg",
        "imgUrl is correct"
      )
      assert.equal(event.description, "somecat", "description is correct")
      assert.equal(event.catName, "catname", "catname is correct")
      assert.equal(event.tipAmount, "0", "tip amount is correct")
      assert.equal(event.owner, author, "author is correct")

      // FAILURE: createCat must have id
      await token.createCat("", { from: author }).should.be.rejected
    })

    it("lists cat", async function () {
      const cat = await token.catCollection("someid")
      assert.equal(cat.id, "someid", "id is correct")
      assert.equal(
        cat.imgUrl,
        "https://cdn2.thecatapi.com/images/v63sbirkC.jpg",
        "imgUrl is correct"
      )
      assert.equal(cat.description, "somecat", "description is correct")
      assert.equal(cat.catName, "catname", "catname is correct")
      assert.equal(cat.tipAmount, "0", "tip amount is correct")
      assert.equal(cat.owner, author, "author is correct")
    })

    // it("allows users to tip posts", async function () {
    //   // Track the author balance before purchase
    //   let oldAuthorBalance
    //   oldAuthorBalance = await web3.eth.getBalance(author)
    //   oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

    //   result = await CatCollectionToken.tipPost(postCount, {
    //     from: tipper,
    //     value: web3.utils.toWei("1", "Ether"),
    //   })

    //   // SUCESS
    //   const event = result.logs[0].args
    //   assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct")
    //   assert.equal(event.content, "This is my first post", "content is correct")
    //   assert.equal(
    //     event.tipAmount,
    //     "1000000000000000000",
    //     "tip amount is correct"
    //   )
    //   assert.equal(event.author, author, "author is correct")

    //   // Check that author received funds
    //   let newAuthorBalance
    //   newAuthorBalance = await web3.eth.getBalance(author)
    //   newAuthorBalance = new web3.utils.BN(newAuthorBalance)

    //   let tipAmount
    //   tipAmount = web3.utils.toWei("1", "Ether")
    //   tipAmount = new web3.utils.BN(tipAmount)

    //   const exepectedBalance = oldAuthorBalance.add(tipAmount)

    //   assert.equal(newAuthorBalance.toString(), exepectedBalance.toString())

    //   // FAILURE: Tries to tip a post that does not exist
    //   await CatCollectionToken.tipPost(99, {
    //     from: tipper,
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected
    // })
  })
})
