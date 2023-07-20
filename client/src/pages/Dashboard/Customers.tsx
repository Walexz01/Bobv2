import Pageheader from "../../components/Dashboard/Pageheader";
import { Box } from "@chakra-ui/react";
import CustomersList from "../../components/Dashboard/table/CustomersList";

const Customers = () => {
  return (
    <Box>
      <Pageheader name="Customers" Label="New Customer" path="add" />
      <CustomersList />
    </Box>
  );
};

export default Customers;
