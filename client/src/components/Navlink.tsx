import { Link, Show } from "@chakra-ui/react";
import { NavLink as ReactLink } from "react-router-dom";
import { Link as Props } from "../data";

const Navlink = ({ Icon, name, path }: Props) => {
  return (
    <Link
      userSelect={"none"}
      className="navlink"
      bgColor={"white"}
      width={"100%"}
      p={".6rem"}
      borderRadius={".5rem"}
      fontSize={"1.1rem"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={{ lg: "center", xl: "flex-start" }}
      gap={"9px"}
      color={"blackAlpha.800"}
      as={ReactLink}
      to={path}
    >
      <Icon size={"1.4rem"} />
      <Show above="xl"> {name}</Show>
    </Link>
  );
};

export default Navlink;
