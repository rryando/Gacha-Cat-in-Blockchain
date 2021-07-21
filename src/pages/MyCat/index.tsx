import React from "react"
import { Grid } from "semantic-ui-react"
import CatAlbum from "components/CatAlbum"
const MyCatPage = (props: any) => {
  const { isWeb3Loading } = props.isWeb3Loading
  const catCollectionData = props.catCollection || null

  return (
    <Grid>
      <Grid.Row columns={3}>
        {catCollectionData &&
          catCollectionData.map((catAlbumData: any) => (
            <Grid.Column>
              <CatAlbum {...catAlbumData} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  )
}

export default MyCatPage
