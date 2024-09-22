import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function NotFound() {
  return (
    <>
      <Box w={"full"}>
        <Flex textAlign={"center"} justifyContent={"center"} my={"20%"}>
          <Text fontSize={"xx-large"}> 404 Page Not Found!</Text>
        </Flex>
      </Box>
    </>
  );
}

export default NotFound;
