import { useEffect, useState } from "react";
import Dashtable from "../Dashtable";
import { axiosInstance } from "../../../services/api-client";
import { useMediaQuery } from "@chakra-ui/react";

const Toptenproducts = () => {
  const [isSmallerThan960] = useMediaQuery("(max-width: 960px)");
  const [isSmallerThan860] = useMediaQuery("(max-width: 860px)");
  const [isSmallerThan520] = useMediaQuery("(max-width: 520px)");

  const [body, setbody] = useState([]);

  const getTopProducts = async () => {
    const result = await axiosInstance.get("products/top");
    setbody(result.data);
  };

  useEffect(() => {
    getTopProducts();
  }, []);
  const tHead = isSmallerThan520
    ? ["id", "name", "Unit Price"]
    : isSmallerThan860
    ? ["id", "name", "Total Purchase", "Times", "Unit Price"]
    : isSmallerThan960
    ? ["id", "name", "Total Purchase", "Unit Price"]
    : ["id", "name", "Total Purchase", "Times", "Unit Price"];
  const removekeys = isSmallerThan520
    ? ["number_of_times_purchased", "total_quantity_purchased"]
    : isSmallerThan860
    ? [""]
    : isSmallerThan960
    ? ["number_of_times_purchased"]
    : [""];

  return (
    <Dashtable
      heading="Top 10 Products"
      tHead={tHead}
      data={body}
      removeKeys={removekeys}
    />
  );
};

export default Toptenproducts;
