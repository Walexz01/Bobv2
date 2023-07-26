import { Heading, Flex, Box, useColorModeValue, Text } from "@chakra-ui/react";

interface Props {
  header: string;
  detailObj: Record<string, any>;
}
const ListHeader = ({ header, detailObj = {} }: Props) => {
  const bg = useColorModeValue("white", "#252944");
  const keys: string[] = Object.keys(detailObj);
  console.log(keys);

  return (
    <Box bgColor={bg} p={"10px"} borderRadius={"10px"} boxShadow={"base"}>
      <Heading size={"md"}>{header}</Heading>
      <Flex
        flexDir={"row"}
        gap={"2rem"}
        pt={"1rem"}
        fontWeight={"bold"}
        fontSize={"1.1rem"}
      >
        {keys.map((key, index) => (
          <Text key={index}>
            {key} : {detailObj[key]}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default ListHeader;
