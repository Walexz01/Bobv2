import Pageheader from "../../components/Dashboard/Pageheader";
import AllSales from "../../components/Dashboard/table/AllSales";
import { Box } from "@chakra-ui/react";

const Payments = () => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
      <Pageheader name="Payments List" />
      <AllSales />
    </Box>
  );
};

export default Payments;
