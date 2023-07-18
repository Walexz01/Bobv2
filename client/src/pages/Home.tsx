import { Grid, GridItem } from "@chakra-ui/react";
import Homeright from "../components/Homeright";
import HomeLeft from "../components/HomeLeft";

const Home = () => {
  return (
    <Grid width={"100%"} templateColumns={{ lg: "3fr 2fr" }} gap={"1rem"}>
      <GridItem>
        <HomeLeft />
      </GridItem>
      <GridItem>
        <Homeright />
      </GridItem>
    </Grid>
  );
};

export default Home;
