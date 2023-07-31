import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef } from "react";

import loader from "../../assets/Spin-1s-200px.gif";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoaded: boolean;
  children: ReactNode;
  modelHeader?: string;
}
const ModelContainer = ({
  isOpen,
  onClose,
  isLoaded,
  children,
  modelHeader,
}: Props) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      isCentered
      motionPreset="scale"
      scrollBehavior="outside"
      onClose={onClose}
    >
      <ModalOverlay bgColor={"none"} backdropBlur={"20px"} />
      <ModalContent p={"2rem .5rem "} bgColor={isLoaded ? "transparent" : ""}>
        {isLoaded && <img src={loader} className="loader" alt="" />}
        {!isLoaded && (
          <>
            <ModalHeader width={"100%"}>{modelHeader}</ModalHeader>
            <ModalCloseButton />
            {children}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModelContainer;
