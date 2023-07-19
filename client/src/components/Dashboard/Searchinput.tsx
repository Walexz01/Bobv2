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
  value: string;
  setInput: (e: string) => void;
}
const Searchinput = ({
  placeholder,
  inputWidth,
  value,
  groupWidth,
  setInput,
}: Props) => {
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
        value={value}
        onChange={(e) => setInput(e.target.value)}
      />
    </InputGroup>
  );
};

export default Searchinput;
