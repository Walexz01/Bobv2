import { Outlet } from "react-router-dom";
import { Box, Grid, GridItem, Show, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Dashboard/Navbar";
import Header from "../components/Dashboard/Header";

const Dashboard = () => {
  const bg = useColorModeValue("white", "#141627");
  const mainBg = useColorModeValue("#f7f8fa", "#1e2037");

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
          bgColor={bg}
          bottom={0}
          left={0}
        >
          <Navbar />
        </GridItem>
      </Show>

      <GridItem position={"relative"} w={"100%"} bgColor={mainBg} area={"dash"}>
        <Header />
        <Box pt={"70px"} px={"10px"} width={"100%"}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
