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
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SmallNav = ({ isOpen, onClose }: Props) => {
  const bg = useColorModeValue("white", "#141627");

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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SmallNav;
