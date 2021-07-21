import React from "react"
import {
  Image,
  Button,
  Modal,
  Grid,
  List,
  Icon,
  Label,
  Input,
} from "semantic-ui-react"
function ModalReducer(state: any, action: any) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer }
    case "CLOSE_MODAL":
      return { open: false }
    default:
      throw new Error()
  }
}

const CatAlbum = (props: any) => {
  const [state, dispatch] = React.useReducer(ModalReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state
  return (
    <>
      <div
        className={"cat-album-card"}
        onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })}
      >
        <div className={"cat-album-container"}>
          <Image src={props.imgUrl} className={"cat-album-image"} />
        </div>
        <h3>{props.name}</h3>
      </div>
      <Modal
        inverted
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Content style={{ background: "#1b1c1d" }}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <div className={"cat-album-container"}>
                  <Image src={props.imgUrl} className={"cat-album-image"} />
                </div>
              </Grid.Column>
              <Grid.Column>
                <List inverted>
                  <List.Item inverted>
                    <List.Header
                      style={{
                        fontSize: 20,
                        marginBottom: 12,
                        fontWeight: "bolder",
                      }}
                    >
                      {props.name}
                    </List.Header>
                  </List.Item>
                  <List.Item inverted>
                    <List.Header
                      style={{
                        marginBottom: 10,
                        fontWeight: "100",
                      }}
                    >
                      {props.description}
                    </List.Header>
                  </List.Item>
                  <List.Item inverted>
                    <List.Header
                      style={{
                        marginTop: 10,
                        // fontWeight: "100",
                      }}
                    >
                      {"Owner Address"}
                    </List.Header>
                  </List.Item>
                  <List.Item inverted>
                    <Input
                      icon="address book"
                      iconPosition="left"
                      disabled
                      value={props.owner}
                      style={{ width: "100%" }}
                    />
                  </List.Item>
                  <List.Item inverted style={{ marginTop: 20 }}>
                    <Button as="div" labelPosition="right">
                      <Button color="red">
                        <Icon name="money bill alternate" />
                        Tip
                      </Button>
                      <Label as="a" basic color="red" pointing="left">
                        {props.tipAmount}
                      </Label>
                    </Button>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions style={{ background: "#1b1c1d" }}>
          <Button positive onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default CatAlbum
