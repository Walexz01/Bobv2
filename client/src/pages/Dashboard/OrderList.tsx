import { Box, useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Dashtable, { sortType } from "../../components/Dashboard/Dashtable";
import { axiosInstance } from "../../services/api-client";
import { useParams } from "react-router-dom";
import ListHeader from "../../components/Dashboard/ListHeader";

const OrderList = () => {
  const { name } = useParams();

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
    length?: number;
  }

  const [Data, setdata] = useState<datain>({
    currentPage,
    totalItems: 0,
    results: [],
    totalPages: 0,
  });

  const [isSmallerThan730] = useMediaQuery("(max-width: 730px)");
  const [isSmallerThan630] = useMediaQuery("(max-width: 630px)");
  const [isSmallerThan540] = useMediaQuery("(max-width: 540px)");
  const [isSmallerThan480] = useMediaQuery("(max-width: 480px)");

  const tbody = Data?.results;

  const sortArray: sortType[] = [
    {
      label: "Order id",
      value: "id",
    },
    {
      label: "Customer name",
      value: "customer_name",
    },
    {
      label: "Amount",
      value: "total_amount",
    },
    {
      label: "Seller",
      value: "seller",
    },
    {
      label: "Status",
      value: "status_name",
    },
    {
      label: "Date",
      value: "order_date",
    },
  ];
  const thead = isSmallerThan480
    ? ["Order id", "Total ($)", "status"]
    : isSmallerThan540
    ? ["Order id", "Customer Name", "Total amount", "status"]
    : isSmallerThan630
    ? ["Order id", "Customer Name", "Total amount", "seller", "status"]
    : isSmallerThan730
    ? ["Order id", "Customer Name", "Total amount", "seller", "status", "date"]
    : [
        "Order id",
        "Customer Name",
        "Total amount",
        "seller",
        "status",
        "time",
        "date",
      ];
  const removekeys = isSmallerThan480
    ? ["order_time", "order_date", "seller", "customer_name"]
    : isSmallerThan540
    ? ["order_time", "order_date", "seller"]
    : isSmallerThan630
    ? ["order_time", "order_date"]
    : isSmallerThan730
    ? ["order_time"]
    : [""];

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`orders`, {
        params: {
          search: searchValue,
          page: currentPage,
          size: 20,
          sort: sortBy.value,
          rank: rankBy.value,
          name: name,
        },
      });
      setdata(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [name, rankBy, sortBy, searchValue, currentPage]);

  const listDetailObj = {
    Name: name,
    "Total Orders": Data?.length,
  };

  return (
    <>
      <ListHeader header="Customer Detail" detailObj={listDetailObj} />
      <Box pt={"20px"}>
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
          isDetail
          detailPath="/dash/orders/items"
          detailKey="id"
        />
      </Box>
    </>
  );
};

export default OrderList;
