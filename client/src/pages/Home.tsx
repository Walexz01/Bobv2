import { Grid, GridItem } from "@chakra-ui/react";
import Homechart from "../components/Homechart";

const Home = () => {
  return (
    <Grid width={"100%"} templateColumns={{ lg: "3fr 1fr" }} gap={"1rem"}>
      <GridItem>
        <Homechart />
      </GridItem>
      <GridItem>hello</GridItem>
    </Grid>
  );
};

export default Home;
