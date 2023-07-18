import { AllProducts, Product } from "../../../data";
import Dashtable from "../Dashtable";

const AllProduct = () => {
  const tbody: Product[] = AllProducts;

  return (
    <Dashtable
      isDetail={true}
      tHead={[
        "id",
        "Product Name",
        "Quantity",
        "Description",
        "Unit Price",
        "",
      ]}
      isSearchable={true}
      data={tbody}
    />
  );
};

export default AllProduct;
