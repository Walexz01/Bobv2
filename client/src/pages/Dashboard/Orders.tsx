import {
  Box,
  Button,
  ModalBody,
  ModalFooter,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Pageheader from "../../components/Dashboard/Pageheader";
import AllOrders from "../../components/Dashboard/table/AllOrders";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import { useState } from "react";
import Modelinput from "../../components/Dashboard/Modelinput";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/api-client";

const Orders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const btnBg = useColorModeValue("#126be9", "#e5549a");

  const handleOpen = () => {
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
      const result = await axiosInstance.get("orders/checkuser", {
        params: {
          customer_name: customerName,
        },
      });

      toast({
        title: "Customer exists!.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });

      setCustomerName("");
      setIsSubmitting(false);
      navigate(`new/${result.data[0].id}`);
    } catch (error: any) {
      const msg = error.response.data.message;
      toast({
        title: msg,
        status: "error",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }
  };
  return (
    <Box>
      <ModelContainer
        isLoaded={isLoaded}
        isOpen={isOpen}
        onClose={onClose}
        modelHeader="Create Order"
      >
        <form className="modalform" onSubmit={handleSubmit}>
          <ModalBody pb={6} width={"100%"}>
            <Modelinput
              label="Customer Name"
              placeholder="Enter custtomer name"
              value={customerName}
              setvalue={(value) => setCustomerName(value)}
              first
              isRequired
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

      <Pageheader name="Orders" Label="New Order" handleClick={handleOpen} />
      <AllOrders />
    </Box>
  );
};

export default Orders;
