import {
  Heading,
  Flex,
  Box,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import Statustag from "./table/Statustag";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

interface Props {
  header: string;
  detailObj: Record<string, any>;
  status?: string;
  handleApprove?: () => void;
  handleReject?: () => void;
}
const ListHeader = ({
  header,
  status,
  handleApprove,
  handleReject,
  detailObj = {},
}: Props) => {
  const bg = useColorModeValue("white", "#252944");
  const keys: string[] = Object.keys(detailObj);

  return (
    <Box bgColor={bg} p={"10px"} borderRadius={"10px"} boxShadow={"base"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading size={{ md: "md", base: "sm" }}>{header}</Heading>
        {status && (
          <Box display={"flex"} gap={"1rem"} alignSelf={"flex-end"}>
            {status === "completed" ? (
              <Statustag bg="green.100" label="Approved" />
            ) : status === "cancel" ? (
              <Statustag bg="red.400" label="Rejected" />
            ) : (
              <>
                <Button
                  size={{ md: "md", base: "sm" }}
                  colorScheme="green"
                  leftIcon={<FaCheck />}
                  onClick={handleApprove ? () => handleApprove() : () => {}}
                >
                  Approve
                </Button>
                <Button
                  size={{ md: "md", base: "sm" }}
                  variant={"outline"}
                  leftIcon={<GiCancel />}
                  colorScheme="red"
                  onClick={handleReject ? () => handleReject() : () => {}}
                >
                  Reject
                </Button>
              </>
            )}
          </Box>
        )}{" "}
      </Flex>
      <Flex
        flexDir={{ sm: "row", base: "column" }}
        gap={{ sm: "2rem", base: ".4rem" }}
        pt={"1rem"}
        fontWeight={"bold"}
        fontSize={"1.1rem"}
      >
        {keys.map((key, index) => (
          <Text
            key={index}
            whiteSpace={"nowrap"}
            fontSize={{ base: "1rem", md: "1.1rem" }}
          >
            {key} : {detailObj[key]}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default ListHeader;
