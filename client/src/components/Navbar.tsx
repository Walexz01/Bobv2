import { Show, VStack, Box, Image, useColorModeValue } from "@chakra-ui/react";
import { Links } from "../data";
import Navlink from "./Navlink";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const border = useColorModeValue("gray", "white");

  return (
    <Box
      outline={"none"}
      borderRightColor={border}
      borderRightWidth={"1px"}
      display={"flex"}
      p={"10px"}
      width={"100%"}
      height={"100%"}
      position={"relative"}
      flexDirection={"column"}
      gap={"1rem"}
    >
      <Show above="xl">
        <Box as={Link} to={"/"}>
          <Image
            mx={"auto"}
            alignSelf={"center"}
            width={"70%"}
            src={Logo}
            alt="Logo"
          />
        </Box>
      </Show>

      <VStack gap={".7rem"} pt={"2rem"}>
        {Links.map(({ Icon, name, path }, index) => (
          <Navlink key={index} Icon={Icon} name={name} path={path} />
        ))}
      </VStack>
    </Box>
  );
};

export default Navbar;
