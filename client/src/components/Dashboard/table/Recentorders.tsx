import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/api-client";
import Dashtable from "../Dashtable";

const Recentorders = () => {
  const [isLoading, setIsLoading] = useState(true);
  interface datain {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    results: any[];
  }

  const [Data, setdata] = useState<datain>({
    currentPage: 1,
    totalItems: 0,
    results: [],
    totalPages: 0,
  });
  const tbody = Data?.results;

  const removekeys = ["order_time", "order_date", "seller"];

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`orders`, {
        params: {
          size: 20,
          rank: "desc",
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
  }, []);

  return (
    <Dashtable
      heading="Reccent Order"
      tHead={["id", "Customer Name", "Amount", "Status", ""]}
      data={tbody}
      path="/dash/orders"
      isDetail
      detailPath="/dash/order"
      detailKey="id"
      isLoading={isLoading}
      removeKeys={removekeys}
    />
  );
};

export default Recentorders;
