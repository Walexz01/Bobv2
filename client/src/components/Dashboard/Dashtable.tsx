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
import Searchinput from "./Searchinput";

interface Prop {
  heading?: string;
  tHead: string[];
  data: any[];
  isDetail?: boolean;
  path?: string;
  detailPath?: string;
  detailKey?: string;
  isSearchable?: boolean;
}
const Dashtable = ({
  heading,
  tHead,
  data,
  path,
  detailPath,
  detailKey = "",
  isDetail = false,
  isSearchable = false,
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
        justifyContent={isSearchable ? "flex-end" : "space-between"}
      >
        {isSearchable && (
          <Searchinput
            inputWidth={{ xl: "400px", lg: "250px", md: "100%", sm: "auto" }}
            placeholder="Search products"
            groupWidth={"auto"}
          />
        )}

        {heading && <Heading size={"sm"}>{heading}</Heading>}
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
