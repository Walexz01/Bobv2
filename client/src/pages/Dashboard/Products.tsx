import Pageheader from "../../components/Dashboard/Pageheader";
import AllProduct from "../../components/Dashboard/table/AllProduct";
import {
  Box,
  Button,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useToast,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import Modelinput from "../../components/Dashboard/Modelinput";
import { axiosInstance } from "../../services/api-client";

export interface NewProduct {
  name: string;
  price: string;
  quantity: string;
  description: string;
}

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productDetails, setProductDetails] = useState<NewProduct>({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const toast = useToast();

  const handleclick = () => {
    setIsLoaded(true);
    onOpen();
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await axiosInstance.post("/products", productDetails);
      toast({
        title: "Product added.",
        description: "Product added successfully.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setProductDetails({
        name: "",
        price: "",
        quantity: "",
        description: "",
      });
      setIsSubmitting(false);
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: "error",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
    }
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
        <form className="modalform" onSubmit={handleSubmit}>
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
            <Button type="submit" color={"white"} bgColor={btnBg} mr={3}>
              Add product
              {isSubmitting && <Spinner ml={"5px"} size={"sm"} />}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
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
