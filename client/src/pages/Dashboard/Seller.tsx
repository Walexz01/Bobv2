import {
  Box,
  Button,
  Grid,
  GridItem,
  ModalBody,
  ModalFooter,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Pageheader from "../../components/Dashboard/Pageheader";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/api-client";
import UserCard, { moreMenuType } from "../../components/Landing/UserCard";
import ModelContainer from "../../components/Dashboard/ModelContainer";
import Modelinput from "../../components/Dashboard/Modelinput";
import { MdOutlineModeEdit } from "react-icons/md";

const Seller = () => {
  const [users, setusers] = useState<any[]>([]);
  const allUser = async () => {
    const result = await axiosInstance.get("users/all");
    setusers(result.data);
  };
  useEffect(() => {
    allUser();
  }, []);

  const bg = useColorModeValue("white", "#252944");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(true);
  const [newUser, setnewUser] = useState({
    name: "",
    password: "",
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
      await axiosInstance.post("/users", newUser);
      setusers([
        ...users,
        {
          user_name: newUser.name,
          role: "user",
          date: Date.now(),
          id: Math.random(),
        },
      ]);
      toast({
        title: "Customer created.",
        description: "User created successfully.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      setnewUser({
        name: "",
        password: "",
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
      setIsSubmitting(false);
    }
  };
  const btnBg = useColorModeValue("#126be9", "#e5549a");

  const moreMenu: moreMenuType[] = [
    {
      label: "Edit",
      Icon: MdOutlineModeEdit,
      onclick: () => {},
    },
  ];

  return (
    <Box padding={"20px"} display={"flex"} flexDir={"column"} gap={"1rem"}>
      <ModelContainer
        isLoaded={isLoaded}
        isOpen={isOpen}
        onClose={onClose}
        modelHeader="Create New User"
      >
        <form className="modalform" onSubmit={handleSubmit}>
          <ModalBody pb={6} width={"100%"}>
            <Modelinput
              value={newUser.name}
              label="Customer Name"
              placeholder="Enter customer name"
              first
              setvalue={(value) => setnewUser({ ...newUser, name: value })}
            />
            <Modelinput
              value={newUser.password}
              label="Password"
              placeholder="Enter customer Password"
              setvalue={(value) => setnewUser({ ...newUser, password: value })}
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
      <Pageheader name="Workers" Label="Add New" handleClick={handleclick} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        bgColor={bg}
      >
        {users.map(({ id, user_name, role, date, img }) => (
          <GridItem key={id}>
            <UserCard
              moreMenu={moreMenu}
              img={img}
              user_name={user_name}
              role={role}
              date={date}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Seller;
