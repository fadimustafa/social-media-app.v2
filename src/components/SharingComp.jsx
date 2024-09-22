import { Avatar, Box, Button, Flex, Image, Input } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import React, { useRef } from "react";

const SharingComp = ({ SetNewPost, newPost, uploadFunc, isLoading }) => {
  const { user } = useUser();
  const imgFileRef = useRef(null);
  const handelPost = async (e) => {
    e.preventDefault();
    uploadFunc();
  };

  return (
    <>
      <Box
        w={"full"}
        h={"auto"}
        background={"gray.light"}
        padding={3}
        borderRadius={5}
      >
        <Flex w={"full"} alignItems={"center"} gap={2} mb={3}>
          <Avatar size={"md"} src={user?.imageUrl} />
          <Input
            title="What's on your maind"
            type="text"
            size={"sm"}
            placeholder="What's on your mind?"
            onChange={(e) =>
              SetNewPost({ ...newPost, postText: e.target.value })
            }
            value={newPost.postText}
          />
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Flex gap={2}>
            <Button
              onClick={() => imgFileRef.current.click()}
              title="Add an image"
            >
              Photo/Video
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  SetNewPost({ ...newPost, imgFile: e.target.files[0] })
                }
                style={{ display: "none" }}
                ref={imgFileRef}
              />
            </Button>
            <Button title="Not working at time">Feels</Button>
          </Flex>
          <Button
            isLoading={isLoading}
            loadingText="Loading"
            variant="outline"
            spinnerPlacement="start"
            onClick={handelPost}
          >
            Post
          </Button>
          {/* {<Button onClick={handelPost}>Post</Button>} */}
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} my={3} w={"full"}>
          {newPost?.imgFile && (
            <Image src={URL.createObjectURL(newPost.imgFile)} />
          )}
        </Flex>
      </Box>
    </>
  );
};

export default SharingComp;
