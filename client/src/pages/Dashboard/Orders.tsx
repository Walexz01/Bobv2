import { Box } from "@chakra-ui/react";
import Pageheader from "../../components/Dashboard/Pageheader";
import AllOrders from "../../components/Dashboard/table/AllOrders";

const Orders = () => {
  return (
    <Box>
      <Pageheader name="Orders" Label="New Order" path="add" />
      <AllOrders />
    </Box>
  );
};

export default Orders;
