import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Show,
  Text,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { BiSearch, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { VscBellDot } from "react-icons/vsc";
import { BsMoon } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

const Dashboard = () => {
  return (
    <Grid
      boxSizing="border-box"
      templateAreas={{
        base: `"dash"`,
        lg: `"nav dash"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "70px 1fr",
        xl: "190px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem
          position={"fixed"}
          width={{ lg: "70px", xl: "190px" }}
          h="100vh"
          area={"nav"}
          top={0}
          bgColor={"white"}
          bottom={0}
          left={0}
        >
          <Navbar />
        </GridItem>
      </Show>

      <GridItem
        h={"200vh"}
        position={"relative"}
        w={"100%"}
        bgColor={"blue.50"}
        area={"dash"}
      >
        <Box
          position={"fixed"}
          top={0}
          bottom={0}
          width={"100%"}
          height={"60px"}
          bgColor={"white"}
          display={"flex"}
          alignItems={"center"}
          pl={{ lg: "20px", md: "10px" }}
          pr={{ xl: "200px", lg: "80px" }}
          py={{ lg: "10px", md: "5px" }}
          outline={"none"}
          borderBottomColor={"gray"}
          gap={"1rem"}
          borderBottomWidth={"1px"}
        >
          <Show above="md">
            <Text
              userSelect={"none"}
              fontSize={{ lg: "1rem", xl: "1.3rem" }}
              fontWeight={"bold"}
              // color={"#62656f"}
              color={"blue.200"}
              whiteSpace={"nowrap"}
              fontFamily={"cursive"}
            >
              Bob's Sport Shop
            </Text>
          </Show>

          <Flex px={"10px"} gap={"10px"} flex={1} flexDir={"row"}>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                color={"gray.900"}
                fontSize={"1.2rem"}
              >
                <BiSearch />
              </InputLeftElement>
              <Input
                type="search"
                width={{ xl: "400px", lg: "250px", md: "200px", sm: "auto" }}
                size={"md"}
                placeholder="Search..."
                bgColor={"gray.50"}
                borderRadius={"2rem"}
              />
            </InputGroup>
            <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
              <Box
                cursor={"pointer"}
                border={"1px solid gray"}
                borderColor={"gray.400"}
                p={{ xl: "10px", base: "7px" }}
                borderRadius={"10px"}
                _hover={{ bg: "gray.100" }}
              >
                <VscBellDot size={"1.1rem"} />
              </Box>
              <Box
                cursor={"pointer"}
                border={"1px solid gray"}
                borderColor={"gray.400"}
                p={{ xl: "10px", base: "7px" }}
                bgColor={"gray.100"}
                borderRadius={"10px"}
                _hover={{ bg: "none" }}
              >
                <BsMoon size={"1.1rem"} />
              </Box>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      _hover={{ bg: "gray.100" }}
                      isActive={isOpen}
                      bgColor={"white"}
                      as={Button}
                      onClick={() => console.log("clicked")}
                      rightIcon={
                        isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />
                      }
                    >
                      <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                        <Avatar
                          bg={"teal.500"}
                          icon={<AiOutlineUser fontSize="1.1rem" />}
                          size={"sm"}
                        />
                        <Show above="lg">
                          <Flex flexDir={"column"} gap={0} textAlign={"left"}>
                            <Heading size={"xs"} whiteSpace={"nowrap"}>
                              Adegbite Adewale
                            </Heading>
                            <Text color={"gray.500"}>Admin</Text>
                          </Flex>
                        </Show>
                      </Box>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Profile">
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>Payments </MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title="Help">
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                      </MenuGroup>
                      <MenuItem>Create a Copy</MenuItem>
                      <MenuItem>Mark as Draft</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </Flex>
        </Box>
        <Box pt={"70px"} px={"10px"}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
