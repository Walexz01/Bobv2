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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { BiSearch, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { VscBellDot } from "react-icons/vsc";
import { BsMoon, BsFillSunFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "#141627");
  const mainBg = useColorModeValue("#f7f8fa", "#1e2037");
  const border = useColorModeValue("gray", "white");
  const color = useColorModeValue("blue.200", "#d0d3e7");
  const searchColor = useColorModeValue("gray.900", "#d0d3e7");
  const searchBg = useColorModeValue("gray.50", "#1c1f36");
  const btnBg = useColorModeValue("gray.100", "#646887");

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
          bgColor={bg}
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
        bgColor={mainBg}
        area={"dash"}
      >
        <Box
          position={"fixed"}
          top={0}
          bottom={0}
          width={"100%"}
          height={"60px"}
          bgColor={bg}
          display={"flex"}
          alignItems={"center"}
          pl={{ lg: "20px", md: "10px" }}
          pr={{ xl: "200px", lg: "80px" }}
          py={{ lg: "10px", md: "5px" }}
          outline={"none"}
          borderBottomColor={border}
          gap={"1rem"}
          borderBottomWidth={"1px"}
        >
          <Show above="md">
            <Text
              userSelect={"none"}
              fontSize={{ lg: "1rem", xl: "1.3rem" }}
              fontWeight={"bold"}
              // color={"#62656f"}
              color={color}
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
                color={searchColor}
                fontSize={"1.2rem"}
              >
                <BiSearch />
              </InputLeftElement>
              <Input
                type="search"
                width={{ xl: "400px", lg: "250px", md: "200px", sm: "auto" }}
                size={"md"}
                placeholder="Search..."
                bgColor={searchBg}
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
                _hover={{ bg: btnBg }}
              >
                <VscBellDot size={"1.1rem"} />
              </Box>
              <Box
                cursor={"pointer"}
                border={"1px solid gray"}
                borderColor={"gray.400"}
                p={{ xl: "10px", base: "7px" }}
                bgColor={btnBg}
                borderRadius={"10px"}
                _hover={{ bg: "none" }}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? (
                  <BsMoon size={"1.1rem"} />
                ) : (
                  <BsFillSunFill size={"1.1rem"} />
                )}
              </Box>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      _hover={{ bg: btnBg }}
                      isActive={isOpen}
                      bgColor={"transparent"}
                      as={Button}
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
