import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Links } from "../../data";
import Navlink from "./Navlink";
import { BiUser } from "react-icons/bi";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { SlSocialDropbox } from "react-icons/sl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SmallNav = ({ isOpen, onClose }: Props) => {
  const bg = useColorModeValue("white", "#141627");
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack gap={".7rem"} pt={"2rem"}>
              {Links.map(({ Icon, name, path }, index) => (
                <Navlink
                  show=""
                  key={index}
                  Icon={Icon}
                  name={name}
                  path={path}
                  handleClick={onClose}
                />
              ))}
              {currentUser?.role === "admin" ? (
                <>
                  <Navlink
                    show=""
                    Icon={SlSocialDropbox}
                    name={"Products"}
                    handleClick={onClose}
                    path={"products"}
                  />
                  <Navlink
                    show=""
                    handleClick={onClose}
                    Icon={BiUser}
                    name={"Worker"}
                    path={"workers"}
                  />
                </>
              ) : null}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SmallNav;
