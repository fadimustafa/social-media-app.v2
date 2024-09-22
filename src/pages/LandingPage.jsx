import { Box, Flex, Text } from "@chakra-ui/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import useAddUserSup from "../hooks/useAddUserSup.js";

const LandingPage = () => {
  useAddUserSup();
  return (
    <>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"full"}
      >
        <Box textAlign={"center"} my={50}>
          <Text fontSize={"x-large"}>wellcom To Buzzles</Text>
          <Text fontSize={"md"}>
            why we call it Buzzles?..That is the buzzle.
          </Text>
        </Box>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn redirectUrl="/">
          <UserButton />
        </SignedIn>
      </Flex>
    </>
  );
};

export default LandingPage;
