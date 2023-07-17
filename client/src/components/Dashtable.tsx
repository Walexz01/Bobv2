import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Prop {
  heading: string;
  tHead: string[];
  tbody: any[];
  isDetail?: boolean;
  path?: string;
}
const Dashtable = ({ heading, tHead, tbody, path, isDetail = false }: Prop) => {
  const bg = useColorModeValue("white", "#252944");
  const border = useColorModeValue("gray", "white");

  return (
    <TableContainer
      border={"1px solid gray"}
      borderColor={border}
      bgColor={bg}
      borderRadius={"1rem"}
      p={"10px"}
      boxSizing="border-box"
    >
      <Box
        pb={"10px"}
        px={"5px"}
        display={"flex"}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={"space-between"}
      >
        <Heading size={"sm"}>{heading}</Heading>
        {path && <Link to={path}>See All</Link>}
      </Box>

      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            {tHead.map((string, index) => (
              <Th key={index}>{string}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tbody.map((index) => (
            <Tr key={index}>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              {isDetail && (
                <Td>
                  <Text to={path} as={Link}>
                    Detail
                  </Text>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Dashtable;
