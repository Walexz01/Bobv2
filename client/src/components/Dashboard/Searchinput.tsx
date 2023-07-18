import {
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
interface Props {
  placeholder: string;
  inputWidth: object;
  groupWidth?: string;
}
const Searchinput = ({ placeholder, inputWidth, groupWidth }: Props) => {
  const searchColor = useColorModeValue("gray.900", "#d0d3e7");
  const searchBg = useColorModeValue("gray.50", "#1c1f36");

  return (
    <InputGroup width={groupWidth}>
      <InputLeftElement
        pointerEvents={"none"}
        color={searchColor}
        fontSize={"1.4rem"}
      >
        <BiSearch />
      </InputLeftElement>
      <Input
        type="search"
        width={inputWidth}
        size={"md"}
        placeholder={placeholder}
        bgColor={searchBg}
        borderRadius={"2rem"}
      />
    </InputGroup>
  );
};

export default Searchinput;
