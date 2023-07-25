import {
  useMediaQuery,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useToast,
  useDisclosure,
  Spinner,
  Button,
} from "@chakra-ui/react";
import Dashtable, { moreMenuType, sortType } from "../Dashtable";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/api-client";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import ModelContainer from "../ModelContainer";
import Modelinput from "../Modelinput";
import { NewProduct } from "../../../pages/Dashboard/Products";
import Alert from "../Alert";

const AllProduct = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<sortType>({
    label: "Product id",
    value: "id",
  });

  const [rankBy, setRankBy] = useState<sortType>({
    label: "Ascending",
    value: "asc",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertLoading, setAlertIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertSubmitting, setAlertIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onOpen: alertOpen,
    isOpen: isAlertOpen,
    onClose: alertClose,
  } = useDisclosure();
  const [prductid, setPrductid] = useState(0);
  const [productDetails, setProductDetails] = useState<NewProduct>({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await axiosInstance.put(`/products/${prductid}`, productDetails);
      toast({
        title: "Product updated.",
        description: "Product updated successfully.",
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
      onClose();
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

  const toast = useToast();

  interface datain {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    results: any[];
  }
  const [Data, setdata] = useState<datain>({
    currentPage,
    totalItems: 0,
    results: [],
    totalPages: 0,
  });

  const [isSmallerThan730] = useMediaQuery("(max-width: 730px)");
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");
  const [isSmallerThan400] = useMediaQuery("(max-width: 400px)");
  const tbody = Data?.results;
  const thead = isSmallerThan400
    ? ["Product Name", "Unit Price", ""]
    : isSmallerThan500
    ? ["Product Name", "Quantity", "Unit Price", ""]
    : isSmallerThan730
    ? ["id", "Product Name", "Quantity", "Unit Price", ""]
    : ["id", "Product Name", "Quantity", "Description", "Unit Price", ""];
  const removekeys = isSmallerThan400
    ? ["description", "id", "quantity_in_stock"]
    : isSmallerThan500
    ? ["description", "id"]
    : isSmallerThan730
    ? ["description"]
    : [""];

  const sortArray: sortType[] = [
    {
      label: "Product id",
      value: "id",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Qauntity",
      value: "quantity_in_stock",
    },
    {
      label: "Price",
      value: "unit_price",
    },
  ];
  const btnBg = useColorModeValue("#126be9", "#e5549a");

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get(`products`, {
        params: {
          search: searchValue,
          page: currentPage,
          size: 20,
          sort: sortBy.value,
          rank: rankBy.value,
        },
      });
      setdata(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const moreMenu: moreMenuType[] = [
    {
      label: "Edit",
      Icon: MdOutlineModeEdit,
      onclick: async (e) => {
        try {
          setIsLoaded(true);
          setPrductid(e);
          const result = await axiosInstance.get(`/products/${e}`);
          setProductDetails(result.data);
          onOpen();
          setTimeout(() => {
            setIsLoaded(false);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      label: "Delete",
      Icon: RiDeleteBinFill,
      color: "red.600",
      onclick: (e) => {
        try {
          setAlertIsLoading(true);
          setPrductid(e);
          alertOpen();
          setTimeout(() => {
            setAlertIsLoading(false);
          }, 500);
        } catch (error) {
          console.log(error);
        }
      },
    },
  ];

  const ProductDelete = async () => {
    try {
      setAlertIsSubmitting(true);
      await axiosInstance.delete(`/products/${prductid}`);
      toast({
        title: "Product deleted.",
        description: "Product deleted successfully.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setAlertIsSubmitting(false);
      alertClose();
    } catch (error) {}
  };
  useEffect(() => {
    getProducts();
  }, [rankBy, sortBy, searchValue, currentPage]);

  return (
    <>
      <Alert
        handleDelete={ProductDelete}
        question="Are you sure? You can't undo this action afterwards."
        isOpen={isAlertOpen}
        onClose={alertClose}
        header="Delete Customer"
        isLoaded={isAlertLoading}
        isSubmitting={isAlertSubmitting}
      />
      <ModelContainer
        isLoaded={isLoaded}
        isOpen={isOpen}
        onClose={onClose}
        modelHeader="Edit Product"
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
              readonly
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
              Update product
              {isSubmitting && <Spinner ml={"5px"} size={"sm"} />}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModelContainer>

      <Dashtable
        tHead={thead}
        isSearchable={true}
        data={tbody}
        removeKeys={removekeys}
        isPag
        currentPage={currentPage}
        setcurrentPage={(page) => setPage(page)}
        isSort
        sortBy={sortBy}
        setSortBy={(sort) => setSortBy(sort)}
        sortArray={sortArray}
        searchInput={searchValue}
        setSearch={(value) => setSearchValue(value)}
        setRankBy={(rank) => setRankBy(rank)}
        rankBy={rankBy}
        totalPages={Data.totalPages}
        isLoading={isLoading}
        isMore
        moreMenu={moreMenu}
      />
    </>
  );
};

export default AllProduct;
