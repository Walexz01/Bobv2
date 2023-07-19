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
  MenuButton,
  Button,
  Menu,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ResponsivePagination from "react-responsive-pagination";
import { BiSolidDownArrow } from "react-icons/bi";

import "react-responsive-pagination/themes/classic.css";
import { Link } from "react-router-dom";
import Searchinput from "./Searchinput";
export interface sortType {
  label: string;
  value: string;
}

interface Prop {
  heading?: string;
  tHead: string[];
  data: any[];
  isDetail?: boolean;
  path?: string;
  detailPath?: string;
  detailKey?: string;
  isSearchable?: boolean;
  searchInput?: string;
  setSearch?: (e: string) => void;
  removeKeys?: string[];
  count?: number;
  isPag?: boolean;
  isSort?: boolean;
  currentPage?: number;
  setcurrentPage?: (e: number) => void;
  sortBy?: sortType;
  setSortBy?: (e: sortType) => void;
  sortArray?: sortType[];
}
const Dashtable = ({
  heading,
  tHead,
  data,
  path,
  detailPath,
  removeKeys,
  setcurrentPage,
  setSortBy,
  setSearch,
  searchInput = "",
  currentPage = 1,
  count = 1,
  isPag = false,
  detailKey = "",
  isDetail = false,
  isSort = false,
  isSearchable = false,
  sortBy = { label: "", value: "" },
  sortArray = [],
}: Prop) => {
  const bg = useColorModeValue("white", "#252944");
  const border = useColorModeValue("gray", "white");
  let keyarray: any[] = [];

  if (removeKeys) {
    keyarray = Object.keys(data[0]).filter(
      (value) => !removeKeys.includes(value)
    );
  } else {
    keyarray = Object.keys(data[0]);
  }
  const totalPages = Math.ceil(data.length / count);
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
        pb={"20px"}
        px={"5px"}
        display={"flex"}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={isSearchable ? "flex-start" : "space-between"}
      >
        {isSearchable && (
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={{ base: "flex-start", sm: "center" }}
            justifyContent={isSort ? "space-between" : "flex-end"}
            gap={"1rem"}
            flexDir={{ base: "column", sm: "row" }}
          >
            {isSort && (
              <Box display={"flex"} alignItems={"center"} gap={".5rem"}>
                <Heading size={"sm"}>Sort by:</Heading>
                <Menu>
                  <MenuButton as={Button} rightIcon={<BiSolidDownArrow />}>
                    {sortBy.label ? sortBy.label : "select"}
                  </MenuButton>
                  <MenuList>
                    {sortArray.map(({ label, value }, index) => (
                      <MenuItem
                        key={index}
                        onClick={
                          setSortBy
                            ? () => setSortBy({ label, value })
                            : () => {}
                        }
                      >
                        {label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            )}
            <Box justifySelf={"end"}>
              <Searchinput
                inputWidth={{
                  xl: "400px",
                  lg: "250px",
                  md: "100%",
                  sm: "auto",
                }}
                placeholder="Search products"
                groupWidth={"auto"}
                value={searchInput}
                setInput={setSearch ? (value) => setSearch(value) : () => {}}
              />
            </Box>
          </Box>
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
              {keyarray.map((value, index) => {
                const text = data[value];
                return (
                  <Td
                    key={index}
                    color={
                      text == "walexz"
                        ? "red"
                        : text == "onenine"
                        ? "green"
                        : ""
                    }
                  >
                    {text.length > 30 ? text.slice(0, 30) + "..." : text}
                  </Td>
                );
              })}
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
      {isPag && totalPages > 1 && (
        <Box pt={"20px"}>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={
              setcurrentPage
                ? (currentPage) => setcurrentPage(currentPage)
                : () => {}
            }
          />
        </Box>
      )}
    </TableContainer>
  );
};

export default Dashtable;
