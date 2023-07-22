import { useEffect, useState } from "react";
import Dashtable, { sortType } from "../Dashtable";
import { useMediaQuery } from "@chakra-ui/react";
import { axiosInstance } from "../../../services/api-client";

const AllSales = () => {
  const [currentPage, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<sortType>({
    label: "Order id",
    value: "id",
  });

  const [rankBy, setRankBy] = useState<sortType>({
    label: "Ascending",
    value: "asc",
  });
  const [isLoading, setIsLoading] = useState(true);
  interface datain {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    results: any[];
  }

  const [Data, setdata] = useState<datain>({
    currentPage,
    totalItems: 0,
    results: [],
    totalPages: 0,
  });

  const [isSmallerThan830] = useMediaQuery("(max-width: 830px)");
  const [isSmallerThan550] = useMediaQuery("(max-width: 550px)");
  const [isSmallerThan460] = useMediaQuery("(max-width: 460px)");
  const tbody = Data?.results;

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
    {
      label: "Quantity",
      value: "quantity",
    },
    {
      label: "Unit price",
      value: "unit_price",
    },
    {
      label: "Total price",
      value: "total_price",
    },
    {
      label: "Date",
      value: "sale_date",
    },
  ];

  const thead = isSmallerThan460
    ? ["Order id", "Product Name", "Total Price"]
    : isSmallerThan550
    ? ["Order id", "Product Name", "Quantity", "Total Price"]
    : isSmallerThan830
    ? ["Order id", "Product Name", "Quantity", "Total Price", "Date"]
    : [
        "Order id",
        "Product Id",
        "Product Name",
        "Quantity",
        "Unit Price",
        "Total Price",
        "Time",
        "Date",
      ];
  const removekeys = isSmallerThan460
    ? [
        "product_id",
        "order_date",
        "sale_time",
        "sale_date",
        "unit_price",
        "quantity",
      ]
    : isSmallerThan550
    ? ["product_id", "sale_time", "sale_date", "unit_price"]
    : isSmallerThan830
    ? ["product_id", "sale_time", "unit_price"]
    : [""];

  const getSales = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`sales`, {
        params: {
          search: searchValue,
          page: currentPage,
          size: 20,
          sort: sortBy.value,
          rank: rankBy.value,
        },
      });
      setdata(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSales();
  }, [rankBy, sortBy, searchValue, currentPage]);

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
      setRankBy={(rank) => setRankBy(rank)}
      rankBy={rankBy}
      totalPages={Data.totalPages}
      isLoading={isLoading}
    />
  );
};

export default AllSales;
