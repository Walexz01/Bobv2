import {
  Show,
  VStack,
  Box,
  Image,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import Navlink from "./Navlink";
import lightLogo from "../../assets/lightLogo.png";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Links } from "../../data";
import { BiUser } from "react-icons/bi";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { SlSocialDropbox } from "react-icons/sl";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const border = useColorModeValue("gray", "white");
  const { currentUser } = useContext(AuthContext);

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
        <Box as={Link} to={"/dash/home"}>
          <Image
            mx={"auto"}
            alignSelf={"center"}
            width={"70%"}
            src={colorMode === "light" ? Logo : lightLogo}
            alt="Logo"
          />
        </Box>
      </Show>

      <VStack gap={".7rem"} pt={"2rem"}>
        {Links.map(({ Icon, name, path }, index) => (
          <Navlink key={index} Icon={Icon} name={name} path={path} />
        ))}
        {currentUser?.role === "admin" ? (
          <>
            <Navlink
              Icon={SlSocialDropbox}
              name={"Products"}
              path={"products"}
            />
            <Navlink Icon={BiUser} name={"Worker"} path={"workers"} />
          </>
        ) : null}
      </VStack>
    </Box>
  );
};

export default Navbar;
