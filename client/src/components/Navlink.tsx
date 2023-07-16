import { Link, Show, useColorModeValue } from "@chakra-ui/react";
import { NavLink as ReactLink } from "react-router-dom";
import { Link as Props } from "../data";

const Navlink = ({ Icon, name, path }: Props) => {
  const color = useColorModeValue("blackAlpha.800", "#646887");

  return (
    <Link
      userSelect={"none"}
      className="navlink"
      width={"100%"}
      p={".6rem"}
      borderRadius={".5rem"}
      fontSize={"1.1rem"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={{ lg: "center", xl: "flex-start" }}
      gap={"9px"}
      color={color}
      as={ReactLink}
      to={path}
    >
      <Icon size={"1.4rem"} />
      <Show above="xl"> {name}</Show>
    </Link>
  );
};

export default Navlink;
