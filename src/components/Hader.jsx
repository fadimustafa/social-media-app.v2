import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Hader({ setSearchQu }) {
  const { user } = useUser();
  //this for dark and light mode
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        w={"full"}
        h={12}
        background={"#302d46"}
        mb={10}
        borderRadius={5}
        display={"flex"}
      >
        <Flex flex={6} gap={2}>
          <Box w={"100%"} p={1}>
            <Input
              placeholder="search.."
              size="md"
              w={"100%"}
              onChange={(e) => setSearchQu(e.target.value)}
            />
          </Box>
          <Flex alignItems={"center"} gap={2}>
            <Link to="/home">
              <BsHouseDoor size={"23px"} title="Home page" />
            </Link>
            <Box
              onClick={() =>
                window.location.assign(`/${user?.username}/${user?.id}`)
              }
              title="Profile page"
              cursor={"pointer"}
            >
              <BsPerson size={"23px"} />
            </Box>
          </Flex>
        </Flex>

        <Flex justifyContent={"flex-end"} mr={2} flex={1}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Flex>
      </Box>
      {/* this for dark and light mode  */}
      {/* <Flex justifyContent={"end"} mt={6} mb={12}>
        <Image
          cursor={"pointer"}
          w={7}
          alt="dark=mode"
          src={colorMode === "dark" ? "dark-theme.svg" : "/light-theme.svg"}
          onClick={toggleColorMode}
        />
      </Flex> */}
    </>
  );
}

export default Hader;
