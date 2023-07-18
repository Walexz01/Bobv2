import { Box } from "@chakra-ui/react";
import Pageheader from "../../components/Dashboard/Pageheader";
import AllProduct from "../../components/Dashboard/table/AllProduct";

const Products = () => {
  return (
    <Box>
      <Pageheader name="Products" Label="Add Product" path="add" />
      <AllProduct />
    </Box>
  );
};

export default Products;
