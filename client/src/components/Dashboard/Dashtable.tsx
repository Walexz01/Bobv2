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
  data: any[];
  isDetail?: boolean;
  path?: string;
  detailPath?: string;
  detailKey?: string;
}
const Dashtable = ({
  heading,
  tHead,
  data,
  path,
  detailPath,
  detailKey = "",
  isDetail = false,
}: Prop) => {
  const bg = useColorModeValue("white", "#252944");
  const border = useColorModeValue("gray", "white");
  const keyarray = Object.keys(data[0]);

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
          {data.map((data, index) => (
            <Tr key={index}>
              {keyarray.map((value, index) => (
                <Td key={index}>{data[value]}</Td>
              ))}
              {isDetail && (
                <Td>
                  <Text to={`${detailPath}/${data[detailKey]}`} as={Link}>
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
