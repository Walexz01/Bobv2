import { Input, FormControl, FormLabel } from "@chakra-ui/react";
interface Props {
  label: string;
  type?: string;
  placeholder: string;
  first?: boolean;
  value: string;
  setvalue: (e: string) => void;
  isRequired?: boolean;
}

const Modelinput = ({
  label,
  placeholder,
  value,
  setvalue,
  first = false,
  type = "text",
  isRequired = true,
}: Props) => {
  return (
    <FormControl mt={first ? 0 : 4}>
      <FormLabel>{label}</FormLabel>
      <Input
        required={isRequired}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default Modelinput;
