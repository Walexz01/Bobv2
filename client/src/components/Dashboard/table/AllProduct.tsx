import { useMediaQuery } from "@chakra-ui/react";
import Dashtable, { sortType } from "../Dashtable";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/api-client";

const AllProduct = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<sortType>({
    label: "Product id",
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

  const [isSmallerThan730] = useMediaQuery("(max-width: 730px)");
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  const [isSmallerThan400] = useMediaQuery("(max-width: 400px)");
  const tbody = Data?.results;
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

  const sortArray: sortType[] = [
    {
      label: "Product id",
      value: "id",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Qauntity",
      value: "quantity_in_stock",
    },
    {
      label: "Price",
      value: "unit_price",
    },
  ];

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`products`, {
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
    getProducts();
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

export default AllProduct;
