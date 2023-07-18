import { Box } from "@chakra-ui/react";
import Homechart from "./Homechart";
import Recentorders from "./table/Recentorders";

const HomeLeft = () => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
      <Homechart />
      <Recentorders />
    </Box>
  );
};

export default HomeLeft;
