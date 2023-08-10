import image from "../../assets/Abassador-img-2.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/favicon.png";
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { axiosInstance } from "../../services/api-client";
interface Logininput {
  username: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const bg_btn_pass = useColorModeValue("#e0dfdfc2", "#252944");
  const bg_btn_pass_hover = useColorModeValue("#cbcbcb", "#191b2d");
  const text = useColorModeValue("black", "white");
  const bg = useColorModeValue("#cbcbcb73", "#252944");

  const [userInput, setUserInput] = useState<Logininput>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post("users/login", userInput);
      setUserInput({
        username: "",
        password: "",
      });

      toast({
        title: "Login successfully.",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/dash/home");
      }, 500);
    } catch (err: any) {
      console.log(err);
      toast({
        title: err.response.data.error,
        status: "error",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <section className="auth__section">
      <div className="auth__container">
        <Box className="auth__left" bgColor={bg}>
          <div className="form__container">
            <Box display={"flex"} justifyContent={"center"}>
              <Image width={"5rem"} src={logo} />
            </Box>
            <Heading
              size={"md"}
              m={"2rem 0 1rem 0"}
              textAlign={"center"}
              color={text}
            >
              Login
            </Heading>
            <form className="form" onSubmit={handleSubmit}>
              <Input
                border={"1px solid black"}
                _placeholder={{ opacity: 1, color: "black" }}
                bgColor={"white"}
                placeholder="User Name"
                color={"black"}
                value={userInput.username}
                onChange={(e) =>
                  setUserInput({ ...userInput, username: e.target.value })
                }
              />
              <InputGroup size="md" my={"20px"}>
                <Input
                  pr="2rem"
                  border={"1px solid black"}
                  _placeholder={{ opacity: 1, color: "black" }}
                  bgColor={"white"}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  color={"black"}
                  value={userInput.password}
                  onChange={(e) =>
                    setUserInput({ ...userInput, password: e.target.value })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button
                    bgColor={bg_btn_pass}
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                    _hover={{ bgColor: bg_btn_pass_hover }}
                  >
                    {show ? <AiOutlineEye /> : <BsEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <div className="auth__btn__group">
                <Button
                  width={"100%"}
                  bgColor={"black"}
                  color={"white"}
                  fontWeight={"bold"}
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </Box>

        <div className="auth__right">
          <img src={image} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
