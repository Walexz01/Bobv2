import {
  Box,
  Button,
  Grid,
  GridItem,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Searchinput from "../../components/Dashboard/Searchinput";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../services/api-client";
import ResponsivePagination from "react-responsive-pagination";
import Pageheader from "../../components/Dashboard/Pageheader";
import Dashtable from "../../components/Dashboard/Dashtable";
import Modelinput from "../../components/Dashboard/Modelinput";
import { RiDeleteBinFill } from "react-icons/ri";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import { AuthContext } from "../../context/Auth";

const CreateOrder = () => {
  interface datain {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    results: any[];
  }
  const bg = useColorModeValue("white", "#252944");
  const [input, setInput] = useState("");
  const { currentUser } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Quantity, setQuantity] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const btnBg = useColorModeValue("#126be9", "#e5549a");
  const toast = useToast();
  const navigate = useNavigate();

  const [data, setdata] = useState<datain>({
    currentPage,
    totalItems: 0,
    results: [],
    totalPages: 0,
  });
  interface orderProduct {
    id: string;
    name: string;
    quantity: string;
    price: string;
  }
  const [clickProdu, setClickprod] = useState<orderProduct>({
    id: "1",
    name: "",
    price: "1",
    quantity: "1",
  });

  const [OrderProducts, setOrderProducts] = useState<orderProduct[]>([]);
  const { id } = useParams();
  const getProducts = async () => {
    try {
      const result = await axiosInstance.get(`products`, {
        params: {
          search: input,
          page: currentPage,
          size: 50,
        },
      });
      setdata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [input, currentPage]);
  const totalpage = data?.totalPages;
  const totalCost = OrderProducts.reduce(
    (total, product) =>
      total + parseInt(product?.quantity) * parseFloat(product?.price),
    0
  );
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productIndex = OrderProducts.findIndex(
      (product) => product.id === clickProdu.id
    );

    if (productIndex === -1) {
      setOrderProducts([
        ...OrderProducts,
        { ...clickProdu, quantity: Quantity },
      ]);
    } else {
      setOrderProducts((prevProducts) =>
        prevProducts.map((product, index) =>
          index === productIndex ? { ...product, quantity: Quantity } : product
        )
      );
    }
    onClose();
    setQuantity("1");
  };

  const handleCreate = async () => {
    if (OrderProducts.length > 0) {
      setIsSubmitting(true);
      setTimeout(async () => {
        try {
          await axiosInstance.post("orders/createOrder", {
            id: id,
            products: OrderProducts,
            staff_name: currentUser?.username,
          });
          setIsSubmitting(false);
          toast({
            title: "Order created successfully!",
            status: "success",
            position: "top-right",
            duration: 1000,
            isClosable: true,
          });
          navigate("/dash/orders");
        } catch (error: any) {
          const msg = error.response.data.message;

          toast({
            title: msg,
            status: "success",
            position: "top-right",
            duration: 1000,
            isClosable: true,
          });
          console.log(error);
        }
      }, 500);
    } else {
      toast({
        title: "Pls add products to order!",
        status: "warning",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Pageheader
        name="Ongoing Order"
        Label="Create "
        isSubmitting={isSubmitting}
        handleClick={handleCreate}
      />
      <ModelContainer isOpen={isOpen} onClose={onClose} isLoaded={false}>
        <form className="modalform" onSubmit={handleAdd}>
          <ModalBody pb={6} width={"100%"}>
            <Modelinput
              label="Quantity"
              placeholder="Enter product quantity"
              value={Quantity}
              setvalue={(value) => setQuantity(value)}
              first
              type="number"
              isRequired
            />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" color={"white"} bgColor={btnBg} mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModelContainer>

      <Grid templateColumns="1fr 3fr" gap={6} pt={"1rem"}>
        <GridItem>
          <Box>
            <Searchinput
              inputWidth={{ base: "100%" }}
              placeholder="Search for products"
              setInput={(value) => setInput(value)}
              value={input}
            />
            <Box
              bg={bg}
              p={"10px"}
              borderRadius={"10px"}
              mt={"20px"}
              display={"flex"}
              flexDir={"column"}
              gap={"10px"}
            >
              {data.results.map((value, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >
                  <Text width={"100%"}>{value.name}</Text>
                  <Button
                    size={"sm"}
                    colorScheme="green"
                    onClick={() => {
                      setClickprod({
                        id: value.id,
                        name: value.name,
                        quantity: "1",
                        price: value.unit_price,
                      });
                      onOpen();
                    }}
                  >
                    Add
                  </Button>
                </Box>
              ))}
            </Box>

            {totalpage > 1 && (
              <Box pt={"20px"}>
                <ResponsivePagination
                  current={currentPage}
                  total={totalpage}
                  onPageChange={setCurrentPage}
                />
              </Box>
            )}
          </Box>
        </GridItem>
        <GridItem>
          <Dashtable
            heading="Products Order"
            tHead={["Id", "name", "quantity", "price", ""]}
            data={OrderProducts}
            total={totalCost}
            isMore
            isTotaled
            moreMenu={[
              {
                label: "Remove",
                Icon: RiDeleteBinFill,
                onclick: (id) =>
                  setOrderProducts(
                    OrderProducts.filter((product) => product.id !== id)
                  ),
                color: "red",
              },
            ]}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default CreateOrder;
