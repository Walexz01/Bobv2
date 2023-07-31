import {
  Box,
  Button,
  Heading,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  Label?: string;
  path?: string;
  handleClick?: () => void;
  isSubmitting?: boolean;
}
const Pageheader = ({
  name,
  Label,
  path,
  handleClick,
  isSubmitting = false,
}: Props) => {
  const bg = useColorModeValue("#126be9", "#e5549a");

  return (
    <Box p={"10px"} display={"flex"} justifyContent={"space-between"}>
      <Heading size={"md"}>{name}</Heading>
      {Label && (
        <Button
          to={path}
          bgColor={bg}
          onClick={handleClick ? () => handleClick() : () => {}}
          as={Link}
          color={"white"}
        >
          {Label}
          {isSubmitting && <Spinner ml={"5px"} size={"sm"} />}
        </Button>
      )}
    </Box>
  );
};

export default Pageheader;
