import { Outlet } from "react-router-dom";
import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <Grid
      boxSizing="border-box"
      templateAreas={{
        base: `"dash"`,
        lg: `"nav dash"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "70px 1fr",
        xl: "190px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem
          position={"fixed"}
          width={{ lg: "70px", xl: "190px" }}
          h="100vh"
          area={"nav"}
          top={0}
          bgColor={"white"}
          bottom={0}
          left={0}
        >
          <Navbar />
        </GridItem>
      </Show>

      <GridItem h={"200vh"} w={"100%"} bg="blue" area={"dash"}>
        <Box
          position={"fixed"}
          top={0}
          bottom={0}
          width={"100%"}
          height={"60px"}
          bgColor={"green"}
        >
          Header
        </Box>
        <Box pt={"70px"} px={"10px"}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
