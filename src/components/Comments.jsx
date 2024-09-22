import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import ThreeDotsMenu from "./ThreeDotsMenu";
import useLikes from "../hooks/useLikes.js";
import useTimeAgo from "../hooks/useTimeAgo.js";

const Comments = ({ comment, deletComment }) => {
  const timeAgo = useTimeAgo(comment?.created_at);
  const { hanCommLike, isLiked, likesCunt } = useLikes("comment", comment.id);
  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Flex w={"full"} alignItems={"center"}>
          <Avatar
            size={"xs"}
            src={comment.userinfo?.profile_pic}
            name="fadi mustaf"
          />
          <Text ml={3} mr={1} fontSize={"md"} fontWeight={"bold"}>
            {comment?.userinfo?.profile_name}
          </Text>
        </Flex>
        <Flex gap={1} alignItems={"center"} onClick={(e) => e.preventDefault()}>
          <Text fontSize={"sm"} color={"gray.light"}>
            {timeAgo}
          </Text>
          <ThreeDotsMenu
            onDeletComment={() => deletComment(comment.id)}
            userID={comment?.user_id}
          />
        </Flex>
      </Flex>
      <Text my={1} fontSize={"sm"}>
        {comment?.desc}
      </Text>
      <Flex alignItems={"center"} gap={3}>
        <svg
          cursor="pointer"
          aria-label="Like"
          color={isLiked ? "rgb(237, 73, 86)" : ""}
          fill={isLiked ? "rgb(237, 73, 86)" : "transparent"}
          height="13"
          role="img"
          viewBox="0 0 24 22"
          width="13"
          onClick={() => hanCommLike()}
        >
          <path
            d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
            stroke="currentColor"
            strokeWidth="2"
          ></path>
        </svg>
        <Text fontSize={"xs"} color={"gray.light"}>
          {likesCunt.length} likes
        </Text>
      </Flex>
      <Divider my={1} />
    </>
  );
};

export default Comments;
