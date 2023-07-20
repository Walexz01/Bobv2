import { Topcustomer, Topcustomers } from "../../../data";
import Dashtable from "../Dashtable";

const Toptencustomer = () => {
  const body: Topcustomer[] = Topcustomers;

  return (
    <Dashtable
      isDetail={true}
      heading="Top 10 Customers"
      tHead={["id", "name", "Total Order", ""]}
      data={body}
      detailPath="/dash/customers"
      detailKey="id"
    />
  );
};

export default Toptencustomer;
