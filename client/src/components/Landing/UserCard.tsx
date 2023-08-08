import {
  Avatar,
  Heading,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
interface Props {
  user_name: string;
  role: string;
  date: string;
  img: string;
}
const UserCard = ({ user_name, role, date, img }: Props) => {
  const bg = useColorModeValue("white", "#252944");
  const border = useColorModeValue("gray", "white");

  return (
    <Box
      border={"1px solid white"}
      borderColor={border}
      padding={" 0 1rem 3rem 1rem"}
      borderRadius={"1rem"}
      bgColor={bg}
      display={"flex"}
      flexDir={"column"}
      gap={"1rem"}
      textAlign={"center"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        padding={"1rem 0 1rem 0rem"}
      >
        <BsThreeDotsVertical />
      </Box>
      <Avatar src={img} size={"lg"} />
      <Box>
        <Heading size={"sm"}>{user_name}</Heading>
        <Text>{role} </Text>
        <Text>{date}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
