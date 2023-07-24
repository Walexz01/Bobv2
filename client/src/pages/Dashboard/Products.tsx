import Pageheader from "../../components/Dashboard/Pageheader";
import AllProduct from "../../components/Dashboard/table/AllProduct";
import {
  Box,
  Button,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import Modelinput from "../../components/Dashboard/Modelinput";

interface NewProduct {
  name: string;
  price: string;
  quantity: string;
  description: string;
}

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(true);

  const [productDetails, setProductDetails] = useState<NewProduct>({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleclick = () => {
    setIsLoaded(true);
    onOpen();
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  };
  const btnBg = useColorModeValue("#126be9", "#e5549a");

  return (
    <Box>
      <ModelContainer
        isLoaded={isLoaded}
        isOpen={isOpen}
        onClose={onClose}
        modelHeader="Add Product"
      >
        <ModalBody pb={6} width={"100%"}>
          <Modelinput
            first
            label="Name"
            placeholder="Enter product name"
            value={productDetails.name}
            setvalue={(value) =>
              setProductDetails({ ...productDetails, name: value })
            }
          />
          <Modelinput
            label="Price"
            placeholder="Enter product price"
            type="number"
            value={productDetails.price}
            setvalue={(value) =>
              setProductDetails({ ...productDetails, price: value })
            }
          />
          <Modelinput
            label="Quantity"
            type="number"
            placeholder="Enter product quantity"
            value={productDetails.quantity}
            setvalue={(value) =>
              setProductDetails({ ...productDetails, quantity: value })
            }
          />
          <Modelinput
            label="Description"
            placeholder="Enter product description"
            value={productDetails.description}
            setvalue={(value) =>
              setProductDetails({ ...productDetails, description: value })
            }
          />
        </ModalBody>

        <ModalFooter>
          <Button color={"white"} bgColor={btnBg} mr={3}>
            Add product
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModelContainer>

      <Pageheader
        handleClick={handleclick}
        name="Products"
        Label="Add Product"
      />
      <AllProduct />
    </Box>
  );
};

export default Products;
