import { useMediaQuery } from "@chakra-ui/react";
import { axiosInstance } from "../../../services/api-client";
import Dashtable from "../Dashtable";
import { useEffect, useState } from "react";

const Toptencustomer = () => {
  const [body, setbody] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSmallerThan920] = useMediaQuery("(max-width: 920px)");
  const [isSmallerThan860] = useMediaQuery("(max-width: 860px)");
  const [isSmallerThan520] = useMediaQuery("(max-width: 520px)");

  const getTopCustomers = async () => {
    setIsLoading(true);
    const result = await axiosInstance.get("customers/top");
    setbody(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTopCustomers();
  }, []);
  const tHead = isSmallerThan520
    ? ["id", "name", "Total Order", ""]
    : isSmallerThan860
    ? ["id", "name", "address", "Total Order", ""]
    : isSmallerThan920
    ? ["id", "name", "Total Order", ""]
    : ["id", "name", "address", "Total Order", ""];
  const removekeys = isSmallerThan520
    ? ["address"]
    : isSmallerThan860
    ? [""]
    : isSmallerThan920
    ? ["address"]
    : [""];
  return (
    <Dashtable
      isDetail={true}
      heading="Top 10 Customers"
      tHead={tHead}
      data={body}
      detailPath="/dash/customers"
      detailKey="id"
      removeKeys={removekeys}
      isLoading={isLoading}
    />
  );
};

export default Toptencustomer;
