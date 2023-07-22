import { useEffect, useState } from "react";
import Dashtable, { sortType } from "../Dashtable";
import { useMediaQuery } from "@chakra-ui/react";
import { axiosInstance } from "../../../services/api-client";

const PaymentList = () => {
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
  const [isSmallerThan1032] = useMediaQuery("(max-width: 1032px)");
  const [isSmallerThan830] = useMediaQuery("(max-width: 830px)");
  const [isSmallerThan630] = useMediaQuery("(max-width: 630px)");
  const [isSmallerThan550] = useMediaQuery("(max-width: 550px)");
  const [isSmallerThan440] = useMediaQuery("(max-width: 440px)");

  const tbody = Data?.results;

  const sortArray: sortType[] = [
    {
      label: "Payment id",
      value: "id",
    },
    {
      label: "Order id",
      value: "order_id",
    },
    {
      label: "Name",
      value: "customer_name",
    },
    {
      label: "Amount",
      value: "amount_paid",
    },
    {
      label: "Method",
      value: "payment_method",
    },
    {
      label: "Status",
      value: "status_name",
    },
    {
      label: "Date",
      value: "registration_date",
    },
  ];

  const thead = isSmallerThan440
    ? ["Id", "Amount Paid", "Order Status"]
    : isSmallerThan550
    ? ["Id", "Customer Name", "Amount Paid", "Order Status"]
    : isSmallerThan630
    ? ["Id", "Order Id", "Customer Name", "Amount Paid", "Order Status"]
    : isSmallerThan830
    ? [
        "Id",
        "Order Id",
        "Customer Name",
        "Amount Paid",
        "Order Status",
        "Payment Date",
      ]
    : isSmallerThan1032
    ? [
        "Id",
        "Order Id",
        "Customer Name",
        "Payment Method",
        "Amount Paid",
        "Order Status",
        "Payment Date",
      ]
    : [
        "Id",
        "Order Id",
        "Customer Name",
        "Payment Method",
        "Amount Paid",
        "Order Status",
        "Seller Name",
        "Payment Time",
        "Payment Date",
      ];
  const removekeys = isSmallerThan440
    ? [
        "payment_time",
        "seller_name",
        "payment_method",
        "payment_date",
        "order_id",
        "customer_name",
      ]
    : isSmallerThan550
    ? [
        "payment_time",
        "seller_name",
        "payment_method",
        "payment_date",
        "order_id",
      ]
    : isSmallerThan630
    ? ["payment_time", "seller_name", "payment_method", "payment_date"]
    : isSmallerThan830
    ? ["payment_time", "seller_name", "payment_method"]
    : isSmallerThan1032
    ? ["payment_time", "seller_name"]
    : [""];

  const getPayments = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`payments`, {
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
    getPayments();
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
      />
    </>
  );
};

export default PaymentList;
