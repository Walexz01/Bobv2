import { Customer, Topcustomers } from "../../data";
import Dashtable from "../Dashtable";

const Toptencustomer = () => {
  const body: Customer[] = Topcustomers;

  return (
    <Dashtable
      isDetail={true}
      heading="Top 10 Customers"
      tHead={["id", "name", "Total Order", ""]}
      data={body}
      detailPath="customers"
      detailKey="id"
    />
  );
};

export default Toptencustomer;
