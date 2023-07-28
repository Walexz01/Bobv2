import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Spinner,
} from "@chakra-ui/react";
import loader from "../../assets/Spin-1s-200px.gif";

import React from "react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  question: string;
  handleDelete: () => void;
  isLoaded: boolean;
  isSubmitting: boolean;
  action?: string;
}
const Alert = ({
  isOpen,
  onClose,
  header,
  question,
  handleDelete,
  isLoaded,
  isSubmitting,
  action = "Delete",
}: Props) => {
  const cancelRef = React.useRef(null);
  return (
    <>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p={"1rem 0"}>
            {isLoaded && <img src={loader} className="loader" alt="" />}
            {!isLoaded && (
              <>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {header}
                </AlertDialogHeader>

                <AlertDialogBody>{question}</AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete} ml={3}>
                    {action}
                    {isSubmitting && <Spinner ml={"5px"} size={"sm"} />}
                  </Button>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alert;
