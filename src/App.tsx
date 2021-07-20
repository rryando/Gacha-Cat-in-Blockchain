import "./App.css"
import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"
import IndexPage from "pages"
import GachaPage from "pages/Gacha"
import MyCatPage from "pages/MyCat"
import NavbarComponents from "components/Navbar"
import Web3 from "web3"
import GachaCatToken from "abis/GachaCatToken.json"

declare let window: any

function App() {
  const [account, setAccount] = useState<string>("0x0")
  const [token, setToken] = useState(null)
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [tokenURIs, setTokenURIs] = useState([])

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

    const loadBlockchainData = async () => {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])

      const networkId = await web3.eth.net.getId()
      // @ts-ignore
      const networkData = GachaCatToken.networks[networkId]
      if (networkData) {
        const abi = GachaCatToken.abi
        const address = networkData.address
        const token = new web3.eth.Contract(abi, address)
        setToken(token)

        const totalSupply = await token.methods.totalSupply().call()
        setTotalSupply(totalSupply)
        // Load Tokens
        let balanceOf = await token.methods.balanceOf(accounts[0]).call()
        for (let i = 0; i < balanceOf; i++) {
          let id = await token.methods
            .tokenOfOwnerByIndex(accounts[0], i)
            .call()
          let tokenURI = await token.methods.tokenURI(id).call()

          setTokenURIs(tokenURI)
        }
      } else {
        alert("Smart contract not deployed to detected network.")
      }
    }

    loadWeb3()
    loadBlockchainData()
  }, [])

  return (
    <div className={"App-body"}>
      <Router>
        <NavbarComponents
          account={account}
          token={token}
          totalSupply={totalSupply}
        />
        <Container inverted textAlign="center">
          <Switch>
            <Route path="/" exact>
              <IndexPage />
            </Route>
            <Route path="/gacha" exact>
              <GachaPage />
            </Route>
            <Route path="/swap" exact>
              <IndexPage />
            </Route>
            <Route path="/MyCat" exact>
              <MyCatPage tokenURIs={tokenURIs} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  )
}

export default App
