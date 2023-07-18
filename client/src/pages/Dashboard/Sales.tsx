import { Box } from "@chakra-ui/react";
import Pageheader from "../../components/Dashboard/Pageheader";
import AllSales from "../../components/Dashboard/table/AllSales";

const Sales = () => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
      <Pageheader name="Sales" />
      <AllSales />
    </Box>
  );
};

export default Sales;
