import { Grid, GridItem } from "@chakra-ui/react";
import HomeLeft from "../../components/Dashboard/HomeLeft";
import Homeright from "../../components/Dashboard/Homeright";

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
