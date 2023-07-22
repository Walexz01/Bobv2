import Pageheader from "../../components/Dashboard/Pageheader";
import { Box } from "@chakra-ui/react";
import PaymentList from "../../components/Dashboard/table/PaymentsList";

const Payments = () => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
      <Pageheader name="Payments List" />
      <PaymentList />
    </Box>
  );
};

export default Payments;
