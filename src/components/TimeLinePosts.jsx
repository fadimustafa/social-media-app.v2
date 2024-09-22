import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import ThreeDotsMenu from "./ThreeDotsMenu";
import ActionButtons from "./ActionButtons";
import LikesAndReplies from "./LikesAndReplies";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { useComments } from "../hooks/useComments.js";
import useLikes from "../hooks/useLikes.js";
import useTimeAgo from "../hooks/useTimeAgo.js";

function TimeLinePosts({ post, deletPost }) {
  const timeAgo = useTimeAgo(post?.created_at);
  const { hanPostLike, isLiked, likesCunt } = useLikes("posts", post.id);
  const { comments, newComm, handComment } = useComments(post.id);
  const [openComment, setOpenComment] = useState(false);

  if (comments) comments.sort((a, b) => b.id - a.id);
  return (
    <>
      <Box bg={"#313131"} padding={3} my={5} borderRadius={5}>
        <Flex justifyContent={"space-between"}>
          <Link to={`/${post.userinfo?.user_name}/${post.user_id}`}>
            <Flex w={"full"} alignItems={"center"}>
              <Avatar
                size={"md"}
                src={post.userinfo?.profile_pic}
                name="fadi mustaf"
              />
              <Text ml={3} mr={1} fontSize={"large"} fontWeight={"bold"}>
                {post.userinfo?.profile_name}
              </Text>
              <Image
                w={4}
                h={4}
                src="\public\vrified-icon.png"
                title="First's acount"
              />
            </Flex>
          </Link>
          <Flex
            gap={2}
            alignItems={"center"}
            onClick={(e) => e.preventDefault()}
          >
            <Text fontSize={"md"} color={"gray.light"}>
              {timeAgo}
            </Text>
            <ThreeDotsMenu
              onDeletPost={() => deletPost(post.id)}
              userID={post.user_id}
              userName={post.userinfo?.user_name}
            />
          </Flex>
        </Flex>
        <Text mx={3} my={3}>
          {post.desc}
        </Text>
        <Box w={"full"} overflow={"hidden"} borderRadius={5}>
          <Image src={post?.img} />
        </Box>
        <Flex my={2} gap={2}>
          <ActionButtons
            onOpenComment={() => setOpenComment(!openComment)}
            liked={isLiked}
            setSize="20"
            onLike={() => hanPostLike()}
          />
        </Flex>
        <LikesAndReplies commens={comments?.length} likes={likesCunt?.length} />
        <Divider my={2} />
        <Box>
          {openComment
            ? comments.map((comment) => (
                <Comments
                  deletComment={(id) => handComment(id)}
                  comment={comment}
                  key={comment.id}
                />
              ))
            : null}
        </Box>
        <Box></Box>
        <Flex w={"full"} h={"auto"} gap={3}>
          <Input
            size={"sm"}
            type="text"
            placeholder="add a comment"
            ref={newComm}
          />
          <Button
            size={"sm"}
            onClick={() => {
              handComment();
              setOpenComment(true);
            }}
          >
            post
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default TimeLinePosts;
