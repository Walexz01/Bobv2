import { useMediaQuery } from "@chakra-ui/react";
import { AllProducts, Product } from "../../../data";
import Dashtable from "../Dashtable";

const AllProduct = () => {
  const [isSmallerThan730] = useMediaQuery("(max-width: 730px)");
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  const [isSmallerThan400] = useMediaQuery("(max-width: 400px)");
  const tbody: Product[] = AllProducts;
  const thead = isSmallerThan400
    ? ["Product Name", "Unit Price", ""]
    : isSmallerThan500
    ? ["Product Name", "Quantity", "Unit Price", ""]
    : isSmallerThan730
    ? ["id", "Product Name", "Quantity", "Unit Price", ""]
    : ["id", "Product Name", "Quantity", "Description", "Unit Price", ""];
  const removekeys = isSmallerThan400
    ? ["description", "id", "quantity_in_stock"]
    : isSmallerThan500
    ? ["description", "id"]
    : isSmallerThan730
    ? ["description"]
    : [""];

  return (
    <Dashtable
      isDetail={true}
      tHead={thead}
      isSearchable={true}
      data={tbody}
      removeKeys={removekeys}
    />
  );
};

export default AllProduct;
