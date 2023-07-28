import { Tag } from "@chakra-ui/react";
interface Props {
  bg: string;
  label: string;
}

const Statustag = ({ bg, label }: Props) => {
  return (
    <Tag
      bgColor={bg}
      color={"black"}
      p={{ md: "10px", base: "5px" }}
      size={{ md: "lg", base: "sm" }}
    >
      {label}
    </Tag>
  );
};

export default Statustag;
