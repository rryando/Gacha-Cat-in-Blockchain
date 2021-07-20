import React from "react"
import LogoNoiru from "logo-noiru-2.svg"
import { Menu, Segment, Label, Loader, Dimmer, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const NavbarComponents = (props: any) => {
  const location = useLocation()
  const [activeItem, setActiveItem] = React.useState("home")
  const handleMenuClick = (menu: string) => setActiveItem(menu)
  const checkActiveItem = (menu: string) => location.pathname.includes(menu)
  console.log(props)
  return (
    <Segment inverted style={{ borderRadius: 0 }}>
      <Menu inverted secondary>
        <Menu.Item>
          <Link to={"/"}>
            <img
              src={LogoNoiru}
              height={50}
              style={{ position: "absolute", zIndex: 2 }}
            />
            <div className={"animate-logo"} />
          </Link>
        </Menu.Item>
        <Menu.Item
          style={{ marginLeft: 20 }}
          name="GACHA 😺"
          as={Link}
          to={"/gacha"}
          active={checkActiveItem("gacha")}
          onClick={() => handleMenuClick("GACHA")}
        />
        <Menu.Item
          name="swap"
          as={Link}
          to={"/swap"}
          active={checkActiveItem("swap")}
          onClick={() => handleMenuClick("swap")}
        />

        <Menu.Menu position="right">
          <Menu.Item>
            <Segment inverted>
              <Icon style={{ marginRight: 20 }} name="address card" />
              <span
                style={{
                  textOverflow: "ellipsis",
                  maxWidth: 100,
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {props.account}
              </span>
              <Dimmer active={!props.account} inverted>
                <Loader />
              </Dimmer>
            </Segment>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={"/MyCat"}
            active={checkActiveItem("MyCat")}
            onClick={() => handleMenuClick("MyCat")}
          >
            <Segment inverted>
              <span style={{ marginRight: 20 }}>😼 MyCat</span>
              <Label color="teal">0</Label>
              <Dimmer active inverted>
                <Loader />
              </Dimmer>
            </Segment>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default NavbarComponents
