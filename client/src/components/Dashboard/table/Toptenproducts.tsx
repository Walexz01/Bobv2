import { Product, Topproducts } from "../../../data";
import Dashtable from "../Dashtable";

const Toptenproducts = () => {
  const body: Product[] = Topproducts;

  return (
    <Dashtable
      heading="Top 10 Products"
      tHead={["id", "name", "Total Purchase", "Unit Price"]}
      data={body}
    />
  );
};

export default Toptenproducts;
