import { AllSale, Sale } from "../../../data";
import Dashtable from "../Dashtable";

const AllSales = () => {
  const tbody: Sale[] = AllSale;

  return (
    <Dashtable
      tHead={[
        "Order id",
        "Product Id",
        "Product Name",
        "Quantity",
        "Unit Price",
        "Total Price",
        "date_time",
      ]}
      isSearchable={true}
      data={tbody}
    />
  );
};

export default AllSales;
