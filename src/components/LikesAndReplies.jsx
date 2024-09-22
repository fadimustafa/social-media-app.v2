import { Box, Flex, Text } from "@chakra-ui/react";

const LikesAndReplies = ({ commens, likes }) => {
  return (
    <>
      <Flex gap={2} alignItems={"center"} my={1}>
        <Text color={"gray.light"}>{likes} likes</Text>
        <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text color={"gray.light"}>{commens} comments</Text>
      </Flex>
    </>
  );
};

export default LikesAndReplies;
