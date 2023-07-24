import Pageheader from "../../components/Dashboard/Pageheader";
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
import CustomersList from "../../components/Dashboard/table/CustomersList";

import { useState } from "react";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import Modelinput from "../../components/Dashboard/Modelinput";
import { axiosInstance } from "../../services/api-client";

interface newCustomer {
  name: string;
  address: string;
}

const Customers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(true);
  const [customerDetails, setCustomerDetails] = useState<newCustomer>({
    name: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await axiosInstance.post("/customers", customerDetails);
      toast({
        title: "Customer created.",
        description: "customer added successfully.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setCustomerDetails({
        name: "",
        address: "",
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
        modelHeader="Create customer"
      >
        <form className="modalform" onSubmit={handleSubmit}>
          <ModalBody pb={6} width={"100%"}>
            <Modelinput
              value={customerDetails.name}
              label="Customer Name"
              placeholder="Enter customer name"
              first
              setvalue={(value) =>
                setCustomerDetails({ ...customerDetails, name: value })
              }
            />
            <Modelinput
              value={customerDetails.address}
              label="Address"
              placeholder="Enter customer Address"
              setvalue={(value) =>
                setCustomerDetails({ ...customerDetails, address: value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" color={"white"} bgColor={btnBg} mr={3}>
              Create
              {isSubmitting && <Spinner ml={"5px"} size={"sm"} />}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModelContainer>
      <Pageheader
        handleClick={handleclick}
        name="Customers"
        Label="New Customer"
      />
      <CustomersList />
    </Box>
  );
};

export default Customers;
