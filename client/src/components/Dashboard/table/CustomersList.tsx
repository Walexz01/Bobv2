import { useEffect, useState } from "react";
import Dashtable, { sortType } from "../Dashtable";
import { useMediaQuery } from "@chakra-ui/react";
import { axiosInstance } from "../../../services/api-client";

const CustomersList = () => {
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
  const [isSmallerThan730] = useMediaQuery("(max-width: 730px)");
  const [isSmallerThan580] = useMediaQuery("(max-width: 580px)");
  const [isSmallerThan460] = useMediaQuery("(max-width: 460px)");

  const tbody = Data?.results;

  const sortArray: sortType[] = [
    {
      label: "Order id",
      value: "id",
    },
    {
      label: "Name",
      value: "customer_name",
    },
    {
      label: "Date",
      value: "registration_date",
    },
    {
      label: "Time",
      value: "registration_time",
    },
  ];

  const thead = isSmallerThan460
    ? ["id", "Name"]
    : isSmallerThan580
    ? ["id", "Name", "Address", "Created Date"]
    : isSmallerThan730
    ? ["id", "Name", "Address", "Created Date"]
    : ["id", "Name", "Address", "Created Time", "Created Date"];
  const removekeys = isSmallerThan460
    ? ["registration_time", "registration_date", "address"]
    : isSmallerThan580
    ? ["registration_time", ""]
    : isSmallerThan730
    ? ["registration_time"]
    : [""];

  const getCustomers = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`customers`, {
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
    getCustomers();
  }, [rankBy, sortBy, searchValue, currentPage]);

  return (
    <>
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
        detailPath="/dash/orders/list"
        detailKey="customer_name"
      />
    </>
  );
};

export default CustomersList;
