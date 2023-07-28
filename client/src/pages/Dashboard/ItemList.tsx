import {
  Box,
  Button,
  HStack,
  Heading,
  ModalBody,
  ModalFooter,
  Spinner,
  Stack,
  StackDivider,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import ListHeader from "../../components/Dashboard/ListHeader";
import Dashtable from "../../components/Dashboard/Dashtable";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/api-client";
import Alert from "../../components/Dashboard/Alert";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import SummaryList from "../../components/Dashboard/SummaryList";
import { RadioCard } from "../../components/Dashboard/Radio";

const ItemList = () => {
  const [isSmallerThan410] = useMediaQuery("(max-width: 410px)");
  const [isSmallerThan850] = useMediaQuery("(max-width: 850px)");
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();
  const [isAlertSubmitting, setAlertIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const {
    onOpen: alertOpen,
    isOpen: isAlertOpen,
    onClose: alertClose,
  } = useDisclosure();
  const [isAlertLoading, setAlertIsLoading] = useState(true);

  const [body, setBody] = useState([]);
  const getItems = async () => {
    const result = await axiosInstance.get(`/orders/items/${id}`);
    setBody(result.data);
  };
  useEffect(() => {
    getItems();
  }, [id]);
  const first: Record<string, any> = body[0];
  const detailObj = isSmallerThan410
    ? {
        Id: id,
        Customer: first?.customer_name,
        Date: first?.order_date,
        "Item total": body.length,
      }
    : isSmallerThan850
    ? {
        Id: id,
        Customer: first?.customer_name,
        Date: first?.order_date,
      }
    : {
        Id: id,
        Customer: first?.customer_name,
        Seller: first?.user_name,
        Date: first?.order_date,
        "Item total": body.length,
      };
  const removeKeys = isSmallerThan410
    ? [
        "customer_name",
        "status_name",
        "user_name",
        "order_date",
        "order_time",
        "customer_id",
        "order_id",
        "total_amount",
        "quantity",
      ]
    : [
        "customer_name",
        "status_name",
        "user_name",
        "order_date",
        "order_time",
        "customer_id",
        "order_id",
        "total_amount",
      ];

  const handleRejectOpen = () => {
    setAlertIsLoading(true);
    alertOpen();
    setTimeout(() => {
      setAlertIsLoading(false);
    }, 500);
  };
  const tHead = isSmallerThan410
    ? ["Id", "Name", "Price", "cost"]
    : ["Id", "Name", "Price", "quantity", "cost"];
  const handleReject = async () => {
    try {
      setAlertIsSubmitting(true);
      await axiosInstance.put(`/orders/reject/${id}`);
      toast({
        title: "Order Canceled.",
        description: "Order Canceled successfully.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setAlertIsSubmitting(false);
      navigate("/dash/orders");
      alertClose();
    } catch (error) {
      console.error(error);
    }
  };
  const color = useColorModeValue("#2B3467", "");
  // radio
  const options = ["cash", "card", "transfer"];

  const [input, setInput] = useState({ method_name: "cash", amount: "" });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "method",
    defaultValue: "cash",
    onChange: (e) => setInput({ ...input, method_name: e }),
  });
  const group = getRootProps();
  const checkout = {
    Id: first?.order_id,
    Customer: first?.customer_name,
    Date: first?.order_date,
    Time: first?.order_time,
    seller: first?.user_name,
    total: first?.total_amount,
  };
  const handleApproveOpen = () => {
    setInput({ ...input, amount: checkout.total });
    setIsLoaded(true);
    onOpen();
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  };
  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      await axiosInstance.post(`payments/${id}`, input);
      toast({
        title: "Payment completed.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setIsSubmitting(false);
      onClose();
      navigate("/dash/orders");
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: "error",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });

      console.error(error);
    }
  };
  console.log(input);

  return (
    <>
      <ModelContainer
        isLoaded={isLoaded}
        isOpen={isOpen}
        onClose={onClose}
        modelHeader="Order Summary"
      >
        <ModalBody pb={6} width={"100%"}>
          <Stack divider={<StackDivider />} spacing={4}>
            <Box gap={".7rem"} display={"flex"} flexDir={"column"}>
              <SummaryList label="Order Id" value={checkout.Id} />
              <SummaryList label="Customer Name" value={checkout.Customer} />
              <SummaryList label="Order Date" value={checkout.Date} />
              <SummaryList label="Order Time" value={checkout.Time} />
              <SummaryList label="Seller" value={checkout.seller} />
            </Box>
            <Box>
              <SummaryList
                color="#EB455F"
                label="Total Cost"
                value={`$${checkout.total}`}
              />
              <Box
                flexDir={"column"}
                py={"10px"}
                gap={".8rem"}
                display={"flex"}
                alignItems={"center"}
              >
                <Heading color={color} size={"md"} fontSize={"1.1rem"}>
                  Select payment method
                </Heading>
                <HStack {...group}>
                  {options.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </HStack>

                <Button
                  onClick={handleComplete}
                  colorScheme="green"
                  alignItems={"center"}
                >
                  Complete Payment
                  {isSubmitting && <Spinner ml={"5px"} size={"sm"} />}
                </Button>
              </Box>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModelContainer>

      <Alert
        handleDelete={handleReject}
        question="Are you sure? You can't undo this action afterwards."
        isOpen={isAlertOpen}
        onClose={alertClose}
        header="Cancel Order"
        isLoaded={isAlertLoading}
        isSubmitting={isAlertSubmitting}
        action="Reject"
      />

      <ListHeader
        header="Order Detail"
        status={first?.status_name}
        detailObj={detailObj}
        handleReject={handleRejectOpen}
        handleApprove={handleApproveOpen}
      />
      <Box pt={"20px"}>
        <Dashtable
          heading="Items Ordered"
          tHead={tHead}
          data={body}
          removeKeys={removeKeys}
          total={first?.total_amount}
        />
      </Box>
    </>
  );
};

export default ItemList;
