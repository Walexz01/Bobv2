import { Box } from "@chakra-ui/react";
import Toptencustomer from "./table/Toptencustomer";
import Toptenproducts from "./table/Toptenproducts";
const Homeright = () => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
      <Toptencustomer />
      <Toptenproducts />
    </Box>
  );
};

export default Homeright;
