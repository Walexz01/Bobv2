import { Flex, Heading, Text } from "@chakra-ui/react";
interface Props {
  label: string;
  value: string;
  color?: string;
}

const SummaryList = ({ label, value, color }: Props) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      color={color ? color : ""}
    >
      <Heading size={"sm"}>{label}:</Heading>
      <Text>{value}</Text>
    </Flex>
  );
};

export default SummaryList;
