import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import "./index.css";

function App() {
  return (
    <Grid
      boxSizing="border-box"
      templateAreas={{
        base: `"dash"`,
        lg: `"nav dash"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem
          position={"fixed"}
          width={"200px"}
          h="100vh"
          area={"nav"}
          top={0}
          bgColor={{ lg: "red" }}
          bottom={0}
          left={0}
        >
          <Box width={"170px"} height={"100%"} position={"relative"}>
            Nav
          </Box>
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
        <Box>Main</Box>
      </GridItem>
    </Grid>
  );
}

export default App;
