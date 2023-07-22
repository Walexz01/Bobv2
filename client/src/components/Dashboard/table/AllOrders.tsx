import { useState } from "react";
import { AllSale, Sale } from "../../../data";
import Dashtable, { sortType } from "../Dashtable";
import { useMediaQuery } from "@chakra-ui/react";
const AllOrders = () => {
  const tbody: Sale[] = AllSale;

  const [currentPage, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<sortType>({ label: "", value: "" });

  const [isSmallerThan730] = useMediaQuery("(max-width: 730px)");
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  const [isSmallerThan460] = useMediaQuery("(max-width: 460px)");

  const sortArray: sortType[] = [
    {
      label: "Order id",
      value: "order_id",
    },
    {
      label: "Product id",
      value: "product_id",
    },
    {
      label: "Name",
      value: "name",
    },
  ];
  const thead = isSmallerThan460
    ? ["Order id", "Product Name", "Total Price"]
    : isSmallerThan500
    ? ["Order id", "Product Name", "Quantity", "Total Price"]
    : isSmallerThan730
    ? ["Order id", "Product Name", "Quantity", "Total Price"]
    : [
        "Order id",
        "Product Id",
        "Product Name",
        "Quantity",
        "Unit Price",
        "Total Price",
        "date_time",
      ];
  const removekeys = isSmallerThan460
    ? ["product_id", "order_date", "unit_price", "quantity"]
    : isSmallerThan500
    ? ["product_id", "order_date", "unit_price"]
    : isSmallerThan730
    ? ["product_id", "order_date", "unit_price"]
    : [""];
  return (
    <Dashtable
      tHead={thead}
      isSearchable={true}
      data={tbody}
      removeKeys={removekeys}
      isPag
      currentPage={currentPage}
      setcurrentPage={(page) => setPage(page)}
      isSort
      sortBy={sortBy}
      setSortBy={(sort) => setSortBy(sort)}
      sortArray={sortArray}
      searchInput={searchValue}
      setSearch={(value) => setSearchValue(value)}
    />
  );
};

export default AllOrders;
