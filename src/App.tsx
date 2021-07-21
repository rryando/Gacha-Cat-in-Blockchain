import "./App.css"
import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"
import IndexPage from "pages"
import GachaPage from "pages/Gacha"
import MyCatPage from "pages/MyCat"
import NavbarComponents from "components/Navbar"
import Web3 from "web3"
import CatCollectionToken from "abis/CatCollectionToken.json"
import { ModelGachaResult } from "models/ModelGacha"

declare let window: any

function App() {
  const [isWeb3Loading, setWeb3Loading] = useState(true)
  const [account, setAccount] = useState<string>("0x0")
  const [token, setToken] = useState(null)
  const [catCollection, setCatCollection] = useState<ModelGachaResult[]>()
  const [issuedCat, setIssuedCat] = useState()
  const [tokenURIs, setTokenURIs] = useState([])

  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    // @ts-ignore
    const networkData = CatCollectionToken.networks[networkId]
    if (networkData) {
      const abi = CatCollectionToken.abi
      const address = networkData.address
      const token = new web3.eth.Contract(abi, address)
      setToken(token)

      // const totalSupply = await token.methods.totalSupply().call()
      // setTotalSupply(totalSupply)
      // Load Tokens
      let catCollection = await token.methods
        .getCollectionByOwner(accounts[0])
        .call()

      let issuedCat = await token.methods.issuedCat().call()
      setIssuedCat(issuedCat)
      // console.log("collection: ", catCollection)
      let collection = []
      for (let i = 0; i < catCollection.length; i++) {
        const { id, catName, description, imgUrl, owner, tipAmount } =
          catCollection[i]

        // console.log(catCollection)
        collection[i] = {
          id,
          name: catName,
          description,
          imgUrl,
          owner,
          tipAmount,
        }
      }

      setCatCollection(collection)
    } else {
      alert("Smart contract not deployed to detected network.")
    }
  }

  React.useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        )
      }
    }

    const loadBlockchainWeb3Data = async () => await loadBlockchainData()

    loadWeb3()
    loadBlockchainWeb3Data()
    setWeb3Loading(false)
  }, [])

  return (
    <div className={"App-body"}>
      <Router>
        <NavbarComponents
          account={account}
          token={token}
          catCollection={catCollection}
          isWeb3Loading={isWeb3Loading}
        />
        <Container inverted textAlign="center">
          <Switch>
            <Route path="/" exact>
              <IndexPage />
            </Route>
            <Route path="/gacha" exact>
              <GachaPage
                account={account}
                token={token}
                refreshBlockchain={loadBlockchainData}
              />
            </Route>
            <Route path="/swap" exact>
              <IndexPage />
            </Route>
            <Route path="/MyCat" exact>
              <MyCatPage
                tokenURIs={tokenURIs}
                account={account}
                token={token}
                catCollection={catCollection}
                isWeb3Loading={isWeb3Loading}
              />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  )
}

export default App
