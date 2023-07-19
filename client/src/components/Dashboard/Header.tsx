import {
  Box,
  Flex,
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
  Hide,
  Image,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import lightLogo from "../../assets/lightLogo.png";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { VscBellDot } from "react-icons/vsc";
import { BsMoon, BsFillSunFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Searchinput from "./Searchinput";
import { useState } from "react";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "#141627");
  const border = useColorModeValue("gray", "white");
  const color = useColorModeValue("blue.200", "#d0d3e7");
  const btnBg = useColorModeValue("gray.100", "#646887");

  return (
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
      zIndex={22}
      borderBottomWidth={"1px"}
    >
      <Hide above="xl">
        <Image
          width={{ lg: "140px", base: "100px" }}
          src={colorMode === "light" ? Logo : lightLogo}
          alt="Logo"
        />
      </Hide>
      <Show above="xl">
        <Text
          userSelect={"none"}
          fontSize={{ lg: "1rem", xl: "1.3rem" }}
          fontWeight={"bold"}
          color={color}
          whiteSpace={"nowrap"}
          fontFamily={"cursive"}
        >
          Bob's Sport Shop
        </Text>
      </Show>

      <Flex px={"10px"} gap={"10px"} flex={1} flexDir={"row"}>
        <Hide below="md">
          <Searchinput
            inputWidth={{ xl: "400px", lg: "250px", md: "100%", sm: "auto" }}
            placeholder="Search..."
            value={searchValue}
            setInput={(value) => setSearchValue(value)}
          />
        </Hide>
        <Box
          display={"flex"}
          gap={"1rem"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          flex={1}
        >
          <Box
            cursor={"pointer"}
            border={"1px solid gray"}
            borderColor={"gray.400"}
            p={{ xl: "10px", base: "7px" }}
            borderRadius={"10px"}
            _hover={{ bg: btnBg }}
          >
            <VscBellDot size={"1.4rem"} />
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
              <BsMoon size={"1.4rem"} />
            ) : (
              <BsFillSunFill size={"1.4rem"} />
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
                  rightIcon={isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                >
                  <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                    <Avatar
                      bg={"teal.500"}
                      icon={<AiOutlineUser fontSize="1.1rem" />}
                      size={"sm"}
                    />
                    <Show above="lg">
                      <Flex flexDir={"column"} gap={0} textAlign={"left"}>
                        <Heading
                          fontSize={"1rem"}
                          size={"xs"}
                          whiteSpace={"nowrap"}
                        >
                          Adegbite Adewale
                        </Heading>
                        <Text fontSize={".9rem"} color={"gray.500"}>
                          Admin
                        </Text>
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
  );
};

export default Header;
