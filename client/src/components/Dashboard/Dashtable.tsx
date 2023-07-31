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
  MenuButton,
  Button,
  Menu,
  MenuItem,
  MenuList,
  IconButton,
  Tfoot,
} from "@chakra-ui/react";
import ResponsivePagination from "react-responsive-pagination";
import { BiSolidDownArrow } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import "react-responsive-pagination/themes/classic.css";
import { Link, useNavigate } from "react-router-dom";
import Searchinput from "./Searchinput";
import Skeletontable from "./feedback/Skeletontable";
import { IconType } from "react-icons";
export interface sortType {
  label: string;
  value: string;
}
export interface moreMenuType {
  label: string;
  Icon: IconType;
  onclick: (e: any) => void;
  color?: string;
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
  isPag?: boolean;
  totalPages?: number;
  isSort?: boolean;
  currentPage?: number;
  setcurrentPage?: (e: number) => void;
  sortBy?: sortType;
  rankBy?: sortType;
  setSortBy?: (e: sortType) => void;
  setRankBy?: (e: sortType) => void;
  sortArray?: sortType[];
  isLoading?: boolean;
  isMore?: boolean;
  moreMenu?: moreMenuType[];
  total?: number;
}
const Dashtable = ({
  heading,
  tHead,
  data,
  path,
  detailPath,
  removeKeys = [""],
  setcurrentPage,
  setSortBy,
  setRankBy,
  setSearch,
  isLoading,
  isMore = false,
  searchInput = "",
  currentPage = 1,
  isPag = false,
  totalPages,
  detailKey = "",
  isDetail = false,
  isSort = false,
  moreMenu,
  isSearchable = false,
  sortBy = { label: "", value: "" },
  rankBy = { label: "", value: "" },
  sortArray = [],
  total = 0,
}: Prop) => {
  const bg = useColorModeValue("white", "#252944");
  const border = useColorModeValue("gray", "white");
  let keyarray: any[] = [];

  if (data[0]) {
    keyarray = Object.keys(data[0]);
  }

  if (removeKeys) {
    keyarray = keyarray.filter((value) => !removeKeys.includes(value));
  } else {
    keyarray = Object.keys(data[0]);
  }
  // const totalPages = Math.ceil(data.length / count);

  const rankArray: sortType[] = [
    {
      label: "Ascending",
      value: "asc",
    },
    {
      label: "Descending",
      value: "desc",
    },
  ];

  const navigate = useNavigate();
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
            alignItems={{ base: "flex-start", md: "center" }}
            justifyContent={isSort ? "space-between" : "flex-end"}
            gap={"1rem"}
            flexDir={{ base: "column", md: "row" }}
          >
            {isSort && (
              <Box
                display={"flex"}
                alignItems={{ base: "flex-start", sm: "center" }}
                flexDir={{ base: "column", sm: "row" }}
                gap={".5rem"}
              >
                <Heading size={"sm"}>Sort by:</Heading>
                <Box display={"flex"} gap={"10px"}>
                  <Menu>
                    <MenuButton
                      size={"sm"}
                      as={Button}
                      rightIcon={<BiSolidDownArrow />}
                    >
                      {rankBy.label ? rankBy.label : "select"}
                    </MenuButton>
                    <MenuList>
                      {rankArray.map(({ label, value }, index) => (
                        <MenuItem
                          key={index}
                          onClick={
                            setRankBy && setcurrentPage
                              ? () => {
                                  setRankBy({ label, value }),
                                    setcurrentPage(1);
                                }
                              : () => {}
                          }
                        >
                          {label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>

                  <Menu>
                    <MenuButton
                      size={"sm"}
                      as={Button}
                      rightIcon={<BiSolidDownArrow />}
                    >
                      {sortBy.label ? sortBy.label : "select"}
                    </MenuButton>
                    <MenuList>
                      {sortArray.map(({ label, value }, index) => (
                        <MenuItem
                          key={index}
                          onClick={
                            setSortBy && setcurrentPage
                              ? () => {
                                  setSortBy({ label, value });
                                  setcurrentPage(1);
                                }
                              : () => {}
                          }
                        >
                          {label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
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
                setInput={
                  setSearch && setcurrentPage
                    ? (value) => {
                        setSearch(value), setcurrentPage(1);
                      }
                    : () => {}
                }
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
        {!isLoading && (
          <Tbody cursor={"pointer"}>
            {data.map((data, index) => (
              <Tr
                key={index}
                onClick={
                  isDetail
                    ? () => navigate(`${detailPath}/${data[detailKey]}`)
                    : () => {}
                }
              >
                {keyarray.map((value, index) => {
                  const text = data[value];
                  return (
                    <Td
                      key={index}
                      color={
                        text == "completed"
                          ? "green"
                          : text == "pending"
                          ? "yellow"
                          : text == "cancel"
                          ? "red"
                          : ""
                      }
                    >
                      {text.length > 20 ? text.slice(0, 20) + "..." : text}
                    </Td>
                  );
                })}
                {isMore && (
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        border={"none"}
                        aria-label="Options"
                        icon={<BsThreeDotsVertical />}
                        variant="outline"
                      />
                      <MenuList>
                        {moreMenu?.map(
                          ({ Icon, label, onclick, color }, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => onclick(data["id"])}
                              icon={<Icon />}
                              color={color ? color : ""}
                            >
                              {label}
                            </MenuItem>
                          )
                        )}
                      </MenuList>
                    </Menu>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        )}
        {total >= 0 ? (
          <Tfoot>
            <Tr>
              <th>Total</th>
              <th colSpan={keyarray.length - 2} align="right">
                ${total}
              </th>
            </Tr>
          </Tfoot>
        ) : null}
      </Table>
      {isLoading && <Skeletontable />}
      {isPag && totalPages && totalPages > 1 ? (
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
      ) : null}
    </TableContainer>
  );
};

export default Dashtable;
