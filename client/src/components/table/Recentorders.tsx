import { OrderType, RecentOrders } from "../../data";
import Dashtable from "../Dashtable";

const Recentorders = () => {
  const tbody: OrderType[] = RecentOrders;

  return (
    <Dashtable
      heading="Reccent Order"
      tHead={["id", "Customer Name", "Amount", "Status"]}
      data={tbody}
      path="orders"
    />
  );
};

export default Recentorders;
