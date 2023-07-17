import { Grid, GridItem } from "@chakra-ui/react";
import Homechart from "../components/Homechart";
import Homeright from "../components/Homeright";
import Dashtable from "../components/Dashtable";

const Home = () => {
  const body: string[] = ["sddd", "ddddd", "", "dd"];

  return (
    <Grid width={"100%"} templateColumns={{ lg: "3fr 2fr" }} gap={".8rem"}>
      <GridItem>
        <Homechart />
        <Dashtable
          isDetail={true}
          heading="Reccent Order"
          tHead={["id", "Customer Name", "Amount", "Status", ""]}
          tbody={body}
          path="/"
        />
      </GridItem>
      <GridItem>
        <Homeright />
      </GridItem>
    </Grid>
  );
};

export default Home;
